/**
 * generate-portfolio.mjs
 * 
 * Fetches ALL images from Cloudinary portfolio/ folder and generates
 * src/data/portfolioData.ts — the single source of truth for the Portfolio page.
 * 
 * Run with:  node generate-portfolio.mjs
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLOUD_NAME  = process.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'du2kej0xd';
const API_KEY     = process.env.CLOUDINARY_API_KEY ?? '831823785316418';
const API_SECRET  = process.env.CLOUDINARY_API_SECRET ?? '84P7CYM1agBIuPGmqlFQmOurFcM';

const authHeader = 'Basic ' + Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

// ── Cloudinary helpers ─────────────────────────────────────────────────────

const cldFetch = async (path, opts = {}) => {
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}${path}`, {
    ...opts,
    headers: { Authorization: authHeader, 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error(`Cloudinary ${res.status}: ${await res.text()}`);
  return res.json();
};

const searchAll = async () => {
  let all = [];
  let cursor;
  do {
    const body = {
      expression: 'folder:portfolio/*',
      sort_by: [{ public_id: 'asc' }],
      max_results: 500,
      ...(cursor ? { next_cursor: cursor } : {})
    };
    const data = await cldFetch('/resources/search', { method: 'POST', body: JSON.stringify(body) });
    all = [...all, ...(data.resources ?? [])];
    cursor = data.next_cursor;
    process.stderr.write(`  ${all.length} images fetched...\n`);
  } while (cursor);
  return all;
};

// ── Metadata definitions ───────────────────────────────────────────────────
// Map: folder-name-slug → { category, location, brand, signature }

const METADATA = {
  // Signature Projects
  'the-enclave':           { category: 'Residential Pergolas',  location: 'Dorado, PR',          brand: 'StruXure',          signature: true  },
  'zen-garden':            { category: 'Residential Pergolas',  location: 'Condado, PR',          brand: 'Azenco',            signature: true  },
  'the-bachelorette-house':{ category: 'Residential Pergolas',  location: 'Dorado, PR',           brand: 'Azenco',            signature: true  },
  'barlovento':            { category: 'Motorized Screens',     location: 'Dorado, PR',           brand: 'Progressive Screens', signature: true },
  // Non-signature projects (numbered 2–50)
  'dark-knight':           { category: 'Residential Pergolas',  location: 'Guaynabo, PR',         brand: 'Azenco',            signature: false },
  'cloud-nine':            { category: 'Residential Pergolas',  location: 'Condado, PR',          brand: 'StruXure',          signature: false },
  'the-indigo':            { category: 'Residential Pergolas',  location: 'Puerto Rico',          brand: 'Azenco',            signature: false },
  'golden-retreat':        { category: 'Residential Pergolas',  location: 'St. Regis, PR',        brand: 'StruXure',          signature: false },
  'palacio-provincial':    { category: 'Commercial Pergolas',   location: 'Viejo San Juan, PR',   brand: 'Azenco',            signature: false },
  'blackwood-perch':       { category: 'Residential Pergolas',  location: 'Miramar, PR',          brand: 'Azenco',            signature: false },
  'slate':                 { category: 'Residential Pergolas',  location: 'Puerto Rico',          brand: 'Azenco',            signature: false },
  'caladan-retreat':       { category: 'Residential Pergolas',  location: 'Puerto Rico',          brand: 'StruXure',          signature: false },
  'carport':               { category: 'Premium Carports',      location: 'Bayamón, PR',          brand: 'Azenco',            signature: false },
  'almacen-del-vino':      { category: 'Commercial Pergolas',   location: 'Puerto Rico',          brand: 'Azenco',            signature: false },
  'the-poolhaus':          { category: 'Residential Pergolas',  location: 'Puerto Rico',          brand: 'StruXure',          signature: false },
  'ocean-terrace':         { category: 'Residential Pergolas',  location: 'Isla Verde, PR',       brand: 'Azenco',            signature: false },
  'ember-lounge':          { category: 'Residential Pergolas',  location: 'Miramar, PR',          brand: 'Azenco',            signature: false },
  'the-ivory-deck':        { category: 'Residential Pergolas',  location: 'San Juan, PR',         brand: 'SunTech',           signature: false },
  'shaded-haven':          { category: 'Motorized Screens',     location: 'Humacao, PR',          brand: 'Progressive Screens', signature: false },
  'onyx-lounge':           { category: 'Residential Pergolas',  location: 'Bayamón, PR',          brand: 'StruXure',          signature: false },
  'moonstone':             { category: 'Residential Pergolas',  location: 'Cupey, PR',            brand: 'StruXure',          signature: false },
  'the-halo':              { category: 'Residential Pergolas',  location: 'Mayagüez, PR',         brand: 'StruXure',          signature: false },
  'noir-haven':            { category: 'Residential Pergolas',  location: 'Bayamón, PR',          brand: 'Azenco',            signature: false },
  'solar-dockhouse':       { category: 'Residential Pergolas',  location: 'Humacao, PR',          brand: 'Infinity Rack',     signature: false },
  'hibird-hotel':          { category: 'Commercial Pergolas',   location: 'Condado, PR',          brand: 'Azenco',            signature: false },
  'sunset-escape':         { category: 'Motorized Screens',     location: 'San Juan, PR',         brand: 'Progressive Screens', signature: false },
  'the-blaze':             { category: 'Residential Pergolas',  location: 'San Juan, PR',         brand: 'StruXure',          signature: false },
  'umbra-lounge':          { category: 'Residential Pergolas',  location: 'Guaynabo, PR',         brand: 'Azenco',            signature: false },
  'tropical-escape':       { category: 'Residential Pergolas',  location: 'Dorado, PR',           brand: 'SunTech',           signature: false },
  'the-meridian':          { category: 'Residential Pergolas',  location: 'Condado, PR',          brand: 'Azenco',            signature: false },
  'the-pearl-penthouse':   { category: 'Commercial Pergolas',   location: 'Condado, PR',          brand: 'Azenco',            signature: false },
  'the-jungle-nook':       { category: 'Residential Pergolas',  location: 'Dorado, PR',           brand: 'Azenco',            signature: false },
  'la-finca':              { category: 'Residential Pergolas',  location: 'Puerto Rico',          brand: 'Azenco',            signature: false },
  'renaissance-hotel-isla-verde': { category: 'Commercial Pergolas', location: 'Isla Verde, PR', brand: 'Azenco',            signature: false },
  'the-eagles-nest':       { category: 'Residential Pergolas',  location: 'Dorado, PR',           brand: 'CabanaX',           signature: false },
  'renlita-s-1000':        { category: 'Motorized Doors',       location: 'San Juan, PR',         brand: 'Renlita',           signature: false },
  'summerset':             { category: 'Residential Pergolas',  location: 'Humacao, PR',          brand: 'StruXure',          signature: false },
  'urban-escape':          { category: 'Residential Pergolas',  location: 'Miramar, PR',          brand: 'Azenco',            signature: false },
  'cool-veil':             { category: 'Motorized Screens',     location: 'St. Regis, PR',        brand: 'Progressive Screens', signature: false },
  'marriott-hotel-isla-verde': { category: 'Commercial Pergolas', location: 'Isla Verde, PR',    brand: 'Progressive Screens', signature: false },
  'blue-mirage':           { category: 'Residential Pergolas',  location: 'San Juan, PR',         brand: 'Azenco',            signature: false },
  'carport-1':             { category: 'Premium Carports',      location: 'Puerto Rico',          brand: 'Azenco',            signature: false },
  'tropicana-retreat':     { category: 'Residential Pergolas',  location: 'Puerto Rico',          brand: 'Sho-Pros',          signature: false },
  'solar-pergolas':        { category: 'Residential Pergolas',  location: 'Various',              brand: 'Infinity Rack',     signature: false },
  'brisa-walk':            { category: 'Residential Pergolas',  location: 'Guaynabo, PR',         brand: 'Azenco',            signature: false },
  'sunset-reserve':        { category: 'Residential Pergolas',  location: 'Bayamón, PR',          brand: 'Azenco',            signature: false },
  'the-guardian':          { category: 'Motorized Screens',     location: 'San Juan, PR',         brand: 'Progressive Screens', signature: false },
  'residences-at-the-ritz':{ category: 'Motorized Screens',     location: 'Dorado, PR',           brand: 'Progressive Screens', signature: false },
  'white-noise':           { category: 'Residential Pergolas',  location: 'San Juan, PR',         brand: 'StruXure',          signature: false },
  'noon-control':          { category: 'Motorized Screens',     location: 'Humacao, PR',          brand: 'Progressive Screens', signature: false },
  'the-serenity':          { category: 'Residential Pergolas',  location: 'Cupey, PR',            brand: 'Azenco',            signature: false },
  'graphite-grove':        { category: 'Residential Pergolas',  location: 'Dorado, PR',           brand: 'Azenco',            signature: false },
  'the-villas':            { category: 'Residential Pergolas',  location: 'Puerto Rico',          brand: 'Azenco',            signature: false },
};

// ── Slug helpers ───────────────────────────────────────────────────────────

const slugify = (str) => str
  .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
  .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u')
  .replace(/ñ/g, 'n')
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')
  .trim()
  .replace(/[\s_]+/g, '-')
  .replace(/-+/g, '-');

const stripNumber = (str) => str.replace(/^\d+\.?\d*\s*/, '').trim();

/**
 * Compute a stable numeric sort key from a full folder path.
 *
 * Rules:
 *  - Top-level project:  "portfolio/2. Dark Knight"          → 2000
 *  - Sub-project:        "portfolio/1. Sig Projects/3. Bach" → 1003
 *
 * Multiplying the parent by 1000 guarantees sub-projects of folder 1
 * (1001, 1002, …) always sort before top-level folder 2 (2000).
 */
const folderSortKey = (folderPath) => {
  // Strip the root "portfolio/" prefix, keep the rest
  const withoutRoot = folderPath.replace(/^portfolio\//, '');
  const segments = withoutRoot.split('/');

  const getNum = (seg) => {
    const m = seg.match(/^(\d+(?:\.\d+)?)/);   // e.g. "3.5. The Indigo" → 3.5
    return m ? parseFloat(m[1]) : 999;
  };

  if (segments.length === 1) {
    // flat project — e.g. "2. Dark Knight" → 2000
    return getNum(segments[0]) * 1000;
  } else {
    // nested — e.g. ["1. Signature Projects", "3. The Bachelorette House"]
    // parent × 1000  +  child
    return getNum(segments[0]) * 1000 + getNum(segments[1]);
  }
};

// ── Generate ────────────────────────────────────────────────────────────────

async function main() {
  process.stderr.write('Fetching all portfolio images from Cloudinary...\n');
  const resources = await searchAll();
  process.stderr.write(`Total: ${resources.length} images\n`);

  // Group by asset_folder (Cloudinary's "folder" field)
  const byFolder = new Map();
  for (const r of resources) {
    const folder = r.asset_folder ?? r.public_id.split('/').slice(0, -1).join('/');
    if (!byFolder.has(folder)) byFolder.set(folder, []);
    byFolder.get(folder).push(r);
  }

  // Sort folders by compound numeric sort key
  const sortedFolders = [...byFolder.keys()].sort((a, b) =>
    folderSortKey(a) - folderSortKey(b)
  );

  let orderCounter = 1;

  // Build projects array
  const projects = [];
  for (const folder of sortedFolders) {
    const resources = byFolder.get(folder);
    const folderName = folder.split('/').pop() ?? folder;
    const cleanName = stripNumber(folderName);
    const slug = slugify(cleanName);

    // Skip utility folders
    if (['miscellaneous', 'renderings'].includes(slug)) continue;

    // Sort images numerically by their name segment
    const sorted = [...resources].sort((a, b) => {
      const getN = pid => parseInt(pid.match(/(\d+)[^/]*$/) ?.[1] ?? '9999');
      return getN(a.public_id) - getN(b.public_id);
    });

    const photos = sorted.map(r => r.secure_url);
    const meta = METADATA[slug] ?? {
      category: 'Residential Pergolas',
      location: 'Puerto Rico',
      brand: 'Sho-Pros',
      signature: false
    };

    projects.push({
      id: slug,
      name: cleanName,
      category: meta.category,
      location: meta.location,
      brand: meta.brand,
      signature: meta.signature,
      folderOrder: orderCounter++,   // Cloudinary display order
      coverImage: photos[0] ?? '',
      photos
    });

    process.stderr.write(`  ${orderCounter - 1}. ${cleanName} (${slug}) → ${photos.length} images\n`);
  }

  // Generate TypeScript file
  const ts = `// AUTO-GENERATED — do not edit manually
// Run: node generate-portfolio.mjs
// Generated: ${new Date().toISOString()}

import type { ProjectCategory } from './content';

export interface PortfolioProject {
  id: string;
  name: string;
  category: ProjectCategory;
  location: string;
  brand: string;
  signature: boolean;
  folderOrder: number;   // numeric order from Cloudinary folder names
  coverImage: string;
  photos: string[];
}

export const portfolioProjects: PortfolioProject[] = ${JSON.stringify(projects, null, 2)};
`;

  const outPath = join(__dirname, 'src/data/portfolioData.ts');
  writeFileSync(outPath, ts, 'utf8');
  process.stderr.write(`\n✅ Written ${projects.length} projects to ${outPath}\n`);
}

main().catch(err => {
  process.stderr.write('FATAL: ' + err.message + '\n');
  process.exit(1);
});
