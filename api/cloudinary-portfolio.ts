import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLOUD_NAME  = process.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'du2kej0xd';
const API_KEY     = process.env.CLOUDINARY_API_KEY ?? '';
const API_SECRET  = process.env.CLOUDINARY_API_SECRET ?? '';
const FOLDER_ROOT = 'portfolio';

const authHeader = () =>
  'Basic ' + Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

const cldFetch = async (path: string): Promise<any> => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}${path}`;
  const res = await fetch(url, { headers: { Authorization: authHeader() } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary API error ${res.status}: ${text}`);
  }
  return res.json();
};

/** 
 * Recursively list all images under a given folder prefix.
 * Returns an array of secure_url strings, sorted by public_id (name).
 */
const listImages = async (prefix: string): Promise<string[]> => {
  let allUrls: { url: string; publicId: string }[] = [];
  let nextCursor: string | undefined;

  do {
    const params = new URLSearchParams({
      type: 'upload',
      prefix,
      max_results: '500',
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    });

    const data = await cldFetch(`/resources/image?${params}`);
    const resources: { secure_url: string; public_id: string }[] = data.resources ?? [];

    allUrls = [
      ...allUrls,
      ...resources.map(r => ({ url: r.secure_url, publicId: r.public_id })),
    ];

    nextCursor = data.next_cursor;
  } while (nextCursor);

  // Sort by public_id so images come out in the order they are named (1, 2, 3…)
  allUrls.sort((a, b) => a.publicId.localeCompare(b.publicId, undefined, { numeric: true }));

  return allUrls.map(r => r.url);
};

/**
 * List immediate sub-folders under a given folder path.
 */
const listSubFolders = async (folderPath: string): Promise<string[]> => {
  const data = await cldFetch(`/folders/${folderPath}`);
  const folders: { name: string; path: string }[] = data.folders ?? [];
  return folders.map(f => f.path);
};

export type CloudinaryProject = {
  folderId: string;   // last segment of the path, used to match metadata
  folderPath: string; // full path, e.g. "portfolio/zen-garden"
  images: string[];   // ordered array of secure_url
};

/** 
 * Detect whether "portfolio" has a category level or is a flat list of projects.
 * 
 *  Nested:  portfolio/residential-pergolas/zen-garden/
 *  Flat:    portfolio/zen-garden/
 * 
 * We check if the first-level sub-folders themselves contain sub-folders.
 */
const buildProjects = async (): Promise<CloudinaryProject[]> => {
  const firstLevel = await listSubFolders(FOLDER_ROOT);

  if (firstLevel.length === 0) return [];

  // Peek into the first entry to see if it has children (= nested structure)
  const firstChildren = await listSubFolders(firstLevel[0]);
  const isNested = firstChildren.length > 0;

  if (isNested) {
    // portfolio/category/project → iterate categories then projects
    const projects: CloudinaryProject[] = [];
    for (const categoryPath of firstLevel) {
      const projectPaths = await listSubFolders(categoryPath);
      for (const projectPath of projectPaths) {
        const images = await listImages(projectPath + '/');
        const folderId = projectPath.split('/').pop() ?? projectPath;
        projects.push({ folderId, folderPath: projectPath, images });
      }
    }
    return projects;
  } else {
    // portfolio/project → flat structure
    const projects: CloudinaryProject[] = [];
    for (const projectPath of firstLevel) {
      const images = await listImages(projectPath + '/');
      const folderId = projectPath.split('/').pop() ?? projectPath;
      projects.push({ folderId, folderPath: projectPath, images });
    }
    return projects;
  }
};

// ─── Simple in-process cache (reused across warm lambda invocations) ──────────
let _cache: { data: CloudinaryProject[]; at: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS – allow the same origin (Vercel deployment + local dev)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const forceRefresh = req.query.refresh === '1';

    if (!forceRefresh && _cache && Date.now() - _cache.at < CACHE_TTL_MS) {
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json(_cache.data);
    }

    const projects = await buildProjects();
    _cache = { data: projects, at: Date.now() };

    res.setHeader('X-Cache', 'MISS');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(projects);
  } catch (err: any) {
    console.error('[cloudinary-portfolio]', err);
    return res.status(500).json({ error: err.message ?? 'Internal Server Error' });
  }
}
