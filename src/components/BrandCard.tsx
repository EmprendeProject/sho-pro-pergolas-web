import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';
import { localBrandLogos, localBrandBgs } from '../utils/localAssets';
import './BrandCard.css';

interface BrandCardProps {
  id: string;
  name: string;
  description: string;
  path: string;
  index: number;
  coverImage?: string;
}

export default function BrandCard({ id, name, description, path, index, coverImage }: BrandCardProps) {
  // Cloud photo expected path base
  const cloudFolderName = name === 'Azenco Outdoor' ? 'Azenco' : name.replace(/\s+/g, '');
  
  const basePathCloud = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(name)}`;
  const basePathCloudClean = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(cloudFolderName)}`;
  const basePathCloudId = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(id)}`;

  const localBg = localBrandBgs[id];

  const photoSources = [
    localBg,
    coverImage,
    `${basePathCloud}/1.jpeg`,
    `${basePathCloud}/1.jpg`,
    `${basePathCloud}/1.png`,
    `${basePathCloud}/1.JPG`,
    `${basePathCloud}/1.PNG`,
    `${basePathCloudClean}/1.jpeg`,
    `${basePathCloudClean}/1.jpg`,
    `${basePathCloudClean}/1.png`,
    `${basePathCloudId}/1.jpeg`,
    `${basePathCloudId}/1.jpg`,
    `${basePathCloudId}/1.png`,
  ].filter(Boolean) as string[];

  const localLogo = localBrandLogos[id];

  const logoSources = [
    localLogo,
    `${basePathCloud}/logo.png`,
    `${basePathCloud}/logo.jpeg`,
    `${basePathCloud}/logo.jpg`,
    `${basePathCloud}/logo.PNG`,
    `${basePathCloudClean}/logo.png`,
    `${basePathCloudClean}/logo.jpeg`,
    `${basePathCloudClean}/logo.jpg`,
    `${basePathCloudId}/logo.png`,
    `${basePathCloudId}/logo.jpeg`,
    `${basePathCloudId}/logo.jpg`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(name)}.png`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(name)}.jpeg`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(id)}.png`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(id)}.jpeg`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(name)}%20logo.png`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/logos/${id}.png` // their previous path
  ];

  // Alternate the layout by checking if index is odd
  const isReverse = index % 2 !== 0;

  return (
    <article className={`brand-row ${isReverse ? 'brand-row-reverse' : ''}`}>
      <div className="brand-row-image-container">
        <ImageWithFallback 
          sources={photoSources} 
          alt={name} 
          className="brand-row-image" 
        />
      </div>

      <div className="brand-row-content">
        <div className="brand-row-logo-wrap">
          <ImageWithFallback 
            sources={logoSources} 
            alt={`${name} logo`} 
            className="brand-row-logo" 
            fallbackText={name}
          />
        </div>

        <h2 className="brand-row-title">{name}</h2>
        <p className="brand-row-desc">{description}</p>

        <Link to={path} className="btn btn-outline-wood">
          <span>SEE MORE</span>
        </Link>
      </div>
    </article>
  );
}
