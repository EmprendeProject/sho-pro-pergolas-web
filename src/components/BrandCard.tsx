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
  // Use Vite's URL resolution for images. Adding index + 1 to map to 1.png, 2.png, etc.
  const imgUrl = new URL(`../assets/brands/photos our brands/${index + 1}.png`, import.meta.url).href;
  
  // Logos known in the assets/brands folder
  const logoList = ['hurricane', 'infinity', 'liquidview', 'progressive', 'renlita'];
  const hasLogo = logoList.includes(id);
  const logoUrl = hasLogo ? new URL(`../assets/brands/${id}.png`, import.meta.url).href : null;

  // Alternate the layout by checking if index is odd
  const isReverse = index % 2 !== 0;

  return (
    <article className={`brand-row ${isReverse ? 'brand-row-reverse' : ''}`}>
      <div className="brand-row-image-container">
        <img src={imgUrl} alt={name} className="brand-row-image" />
      </div>

      <div className="brand-row-content">
        <div className="brand-row-logo-wrap">
          {logoUrl ? (
            <img src={logoUrl} alt={`${name} logo`} className="brand-row-logo" />
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
