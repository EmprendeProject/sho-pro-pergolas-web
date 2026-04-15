import { useState, useEffect } from 'react';

const CHANNEL_ID = 'UCdm9h6LyA1_SOHMYp3kBSFg';
// Uploads playlist = replace leading "UC" with "UU"
const UPLOADS_PLAYLIST_ID = 'UU' + CHANNEL_ID.slice(2);
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

interface UseYouTubeVideosResult {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
}

export function useYouTubeVideos(): UseYouTubeVideosResult {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_KEY) {
      setError('YouTube API key not configured.');
      setLoading(false);
      return;
    }

    async function fetchVideos() {
      try {
        setLoading(true);
        setError(null);

        const allVideos: YouTubeVideo[] = [];
        let pageToken = '';

        // Paginate through all uploads (50 per page)
        do {
          const pageParam = pageToken ? `&pageToken=${pageToken}` : '';
          const url =
            `https://www.googleapis.com/youtube/v3/playlistItems` +
            `?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}` +
            `&maxResults=50&key=${API_KEY}${pageParam}`;

          const res = await fetch(url);
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err?.error?.message ?? `HTTP ${res.status}`);
          }
          const data = await res.json();

          for (const item of data.items ?? []) {
            const snippet = item.snippet;
            // Skip deleted/private videos
            if (snippet.title === 'Private video' || snippet.title === 'Deleted video') continue;
            const videoId = snippet.resourceId?.videoId;
            if (!videoId) continue;

            allVideos.push({
              id: videoId,
              title: snippet.title,
              description: snippet.description,
              thumbnail:
                snippet.thumbnails?.maxres?.url ??
                snippet.thumbnails?.high?.url ??
                snippet.thumbnails?.medium?.url ??
                '',
              publishedAt: snippet.publishedAt,
            });
          }

          pageToken = data.nextPageToken ?? '';
        } while (pageToken);

        setVideos(allVideos);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load videos.');
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return { videos, loading, error };
}
