import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { brands } from '../data/content';
import './BrandPortfolio.css';

// Local component to smartly lazy-load a gallery image and hide if not found
const GalleryImage = ({ brandName, index }: { brandName: string; index: number }) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [extIndex, setExtIndex] = useState(0);

  const cloudFolderName = brandName === 'Azenco Outdoor' ? 'Azenco' : brandName.replace(/\s+/g, '');
  const cloudImgBase = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/Our%20Brands%20(Pictures)/${encodeURIComponent(cloudFolderName)}/${index}`;

  const extensions = ['.jpg', '.JPG', '.png', '.PNG'];
  const currentSrc = `${cloudImgBase}${extensions[extIndex]}`;

  if (status === 'error') return null;

  return (
    <div className="brand-project-card" style={status === 'loading' ? { display: 'none' } : {}}>
      <div className="brand-project-image-wrap" style={{ marginBottom: 0 }}>
        <img
          src={currentSrc}
          alt={`${brandName} Gallery ${index}`}
          className="brand-project-image"
          onLoad={() => setStatus('success')}
          onError={() => {
            if (extIndex < extensions.length - 1) {
              setExtIndex((prev) => prev + 1);
            } else {
              setStatus('error');
            }
          }}
        />
      </div>
    </div>
  );
};

export default function BrandPortfolio() {
  const { brandId } = useParams<{ brandId: string }>();
  const [brand, setBrand] = useState<any>(null);

  useEffect(() => {
    // Scroll to top when loading the new page
    window.scrollTo(0, 0);

    const foundBrand = brands.find((b) => b.id === brandId);
    setBrand(foundBrand);
  }, [brandId]);

  if (!brand) {
    return (
      <div className="brand-portfolio-not-found">
        <h2>Brand not found</h2>
        <Link to="/our-brands" className="btn btn-outline-wood">
          <ArrowLeft size={16} />
          <span>Back to Brands</span>
        </Link>
      </div>
    );
  }

  // The hero uses the same background gradient from the brand data if available
  const headerStyle = {
    background: brand.bgGradient || 'var(--color-carbon)',
  };

  const galleryIndices = [1, 2, 3, 4, 5];

  return (
    <div className="brand-portfolio-page">
      {/* Header */}
      <section className="brand-portfolio-header" style={headerStyle}>
        <div className="container brand-portfolio-header-content">
          <Link to="/our-brands" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Brands</span>
          </Link>
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.7)', marginTop: '2rem' }}>
            Portfolio
          </p>
          <h1 className="heading-section brand-portfolio-title" style={{ color: 'var(--color-white)' }}>
            {brand.name}
          </h1>
          <p className="brand-portfolio-desc">
            {brand.description}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding brands-project-section">
        <div className="container">
          <div className="brand-projects-grid">
            {galleryIndices.map((idx) => (
              <GalleryImage key={idx} brandName={brand.name} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Layer */}
      <section className="brands-partner-cta">
        <div className="container">
          <div className="partner-cta-inner">
            <div>
              <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Ready to transform?</p>
              <h2 className="heading-section" style={{ color: 'var(--color-white)', fontSize: '2rem', marginTop: '0.5rem' }}>
                Start Your {brand.name} Project
              </h2>
            </div>
            <Link to="/contact-us" className="btn btn-wood">
              <span>CONTACT US NOW</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
