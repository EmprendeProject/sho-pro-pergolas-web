import { useState, useEffect, useRef } from 'react';
import { portfolioProjects, type PortfolioProject } from '../data/content';

// ─── Types ────────────────────────────────────────────────────────────────────

type CloudinaryRaw = {
  folderId: string;
  folderPath: string;
  images: string[];
};

type HookResult = {
  projects: PortfolioProject[];
  loading: boolean;
  error: string | null;
  /** Call this to force a fresh fetch from Cloudinary (bypasses server cache) */
  refresh: () => void;
};

// ─── Module-level cache (persists across re-renders & route changes) ──────────
let _cachedProjects: PortfolioProject[] | null = null;
let _fetchPromise: Promise<PortfolioProject[]> | null = null;

// Cloudinary optimization helper
const optimizeUrl = (url: string, width: number): string => {
  if (!url || !url.includes('cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`);
};

// ─── Merge helper ─────────────────────────────────────────────────────────────
/**
 * Takes raw Cloudinary folders and merges them with the metadata in content.ts.
 *
 * Priority:
 *  1. If a Cloudinary folder matches a project `id` in content.ts → use that
 *     project's metadata (name, category, location, brand, signature) but
 *     replace its images with the live Cloudinary list.
 *
 *  2. If a Cloudinary folder has NO matching entry in content.ts → show it
 *     with default metadata derived from the folder name.
 *
 * Projects that exist in content.ts but have NO Cloudinary folder → omitted
 * from the result (no images to show).
 */
const mergeWithMetadata = (raw: CloudinaryRaw[]): PortfolioProject[] => {
  if (raw.length === 0) {
    // Fall back to the static list if Cloudinary returned nothing
    return portfolioProjects;
  }

  return raw
    .filter(r => r.images.length > 0) // skip empty folders
    .map(r => {
      const meta = portfolioProjects.find(p => p.id === r.folderId);

      if (meta) {
        return {
          ...meta,
          coverImage: optimizeUrl(r.images[0], 800),
          photos: r.images,
        } satisfies PortfolioProject;
      }

      // No matching metadata – build a reasonable default
      const readableName = r.folderId
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      return {
        id: r.folderId,
        name: readableName,
        category: 'Residential Pergolas',
        location: 'Puerto Rico',
        brand: 'Sho-Pros',
        signature: false,
        coverImage: optimizeUrl(r.images[0], 800),
        photos: r.images,
      } satisfies PortfolioProject;
    });
};

// ─── Fetch function ───────────────────────────────────────────────────────────
const fetchPortfolio = async (force = false): Promise<PortfolioProject[]> => {
  const url = force
    ? '/api/cloudinary-portfolio?refresh=1'
    : '/api/cloudinary-portfolio';

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load portfolio from Cloudinary (${res.status})`);
  }

  const raw: CloudinaryRaw[] = await res.json();
  return mergeWithMetadata(raw);
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCloudinaryPortfolio(): HookResult {
  const [projects, setProjects] = useState<PortfolioProject[]>(
    _cachedProjects ?? portfolioProjects // immediate render with static data
  );
  const [loading, setLoading] = useState<boolean>(!_cachedProjects);
  const [error, setError] = useState<string | null>(null);
  const refreshKey = useRef(0);

  const refresh = () => {
    _cachedProjects = null;
    _fetchPromise = null;
    refreshKey.current += 1;
    setLoading(true);
    setError(null);
  };

  useEffect(() => {
    let cancelled = false;

    if (_cachedProjects && refreshKey.current === 0) {
      setProjects(_cachedProjects);
      setLoading(false);
      return;
    }

    const isForced = refreshKey.current > 0;

    // Deduplicate concurrent fetches (e.g. StrictMode double-mount)
    if (!_fetchPromise) {
      _fetchPromise = fetchPortfolio(isForced);
    }

    _fetchPromise
      .then(result => {
        if (cancelled) return;
        _cachedProjects = result;
        _fetchPromise = null;
        setProjects(result);
        setError(null);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        _fetchPromise = null;
        console.error('[useCloudinaryPortfolio]', err);
        setError(err.message);
        // Keep showing the static data as fallback
        setProjects(portfolioProjects);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // refreshKey is the intentional trigger for re-fetches
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey.current]);

  return { projects, loading, error, refresh };
}
