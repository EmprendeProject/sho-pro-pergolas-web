import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { brands, brandProjects } from '../data/content';
import './BrandPortfolio.css';

export default function BrandPortfolio() {
  const { brandId } = useParams<{ brandId: string }>();
  const [brand, setBrand] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // Scroll to top when loading the new page
    window.scrollTo(0, 0);

    const foundBrand = brands.find((b) => b.id === brandId);
    setBrand(foundBrand);

    const relatedProjects = brandProjects.filter((p) => p.brandId === brandId);
    setProjects(relatedProjects);
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
          {projects.length === 0 ? (
            <div className="no-projects-msg">
              <p>More projects coming soon for {brand.name}.</p>
            </div>
          ) : (
            <div className="brand-projects-grid">
              {projects.map((project, index) => (
                <div key={project.id} className="brand-project-card">
                  {/* For now we use the same main photos for placeholders, looping them to simulate galleries */}
                  <div className="brand-project-image-wrap">
                    <img 
                      src={new URL(`../assets/brands/photos our brands/${(index % 10) + 1}.png`, import.meta.url).href} 
                      alt={project.title} 
                      className="brand-project-image"
                    />
                  </div>
                  <div className="brand-project-info">
                    <h3 className="brand-project-title">{project.title}</h3>
                    <a href={project.link} className="brand-project-link">
                      <span>View Project Gallery</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
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
