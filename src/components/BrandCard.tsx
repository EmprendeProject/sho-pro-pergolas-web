import { useState } from 'react';
import { Link } from 'react-router-dom';
import './BrandCard.css';

interface BrandCardProps {
  id: string;
  name: string;
  description: string;
  path: string;
  index: number;
}

export default function BrandCard({ id, name, description, path, index }: BrandCardProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [photoStep, setPhotoStep] = useState(0);

  // Fallback local image
  const fallbackImgUrl = new URL(`../assets/brands/photos our brands/${index + 1}.png`, import.meta.url).href;
  
  // Cloud photo expected path base
  const cloudFolderName = name === 'Azenco Outdoor' ? 'Azenco' : name.replace(/\s+/g, '');
  const cloudImgBase = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/Our%20Brands%20(Pictures)/${encodeURIComponent(cloudFolderName)}/1`;

  const photoSources = [
    `${cloudImgBase}.jpg`,
    `${cloudImgBase}.JPG`,
    `${cloudImgBase}.png`,
    `${cloudImgBase}.PNG`,
    fallbackImgUrl
  ];

  const currentPhoto = photoSources[photoStep] || fallbackImgUrl;

  // Logos from Supabase "logos" folder
  const logoUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/logos/${id}.png`;

  // Alternate the layout by checking if index is odd
  const isReverse = index % 2 !== 0;

  return (
    <article className={`brand-row ${isReverse ? 'brand-row-reverse' : ''}`}>
      <div className="brand-row-image-container">
        <img 
          src={currentPhoto} 
          alt={name} 
          className="brand-row-image" 
          onError={() => {
            if (photoStep < photoSources.length - 1) {
              setPhotoStep((prev) => prev + 1);
            }
          }}
        />
      </div>

      <div className="brand-row-content">
        <div className="brand-row-logo-wrap">
          {!logoFailed ? (
            <img 
              src={logoUrl} 
              alt={`${name} logo`} 
              className="brand-row-logo" 
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="brand-row-logo-text">{name}</span>
          )}
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
