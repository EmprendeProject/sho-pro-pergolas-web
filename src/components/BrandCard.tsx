import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './BrandCard.css';

interface BrandCardProps {
  name: string;
  description: string;
  logoText?: string;
  logoSrc?: string;
  path: string;
  accentColor?: string;
  bgGradient?: string;
}

export default function BrandCard({ name, description, logoText, logoSrc, path, bgGradient }: BrandCardProps) {
  return (
    <article className="brand-card">
      <div className="brand-card-logo-wrap" style={{ background: bgGradient || 'var(--color-gray-100)' }}>
        {logoSrc ? (
          <img src={logoSrc} alt={name} className="brand-card-logo-img" />
        ) : (
          <span className="brand-card-logo-text">{logoText || name}</span>
        )}
      </div>
      <div className="brand-card-body">
        <h3 className="brand-card-title">{name}</h3>
        <p className="brand-card-desc">{description}</p>
        <Link to={path} className="brand-card-link">
          <span>SEE MORE</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
