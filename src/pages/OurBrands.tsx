import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BrandCard from '../components/BrandCard';
import { brands } from '../data/content';
import './Portfolio.css';
import './OurBrands.css';

export default function OurBrands() {
  return (
    <div className="brands-page">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Premium Partners</p>
          <h1 className="heading-section page-header-title" style={{ color: 'var(--color-white)' }}>
            OUR BRANDS
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.75rem', maxWidth: '550px' }}>
            Every brand we carry is hand-selected for performance, beauty, and durability — perfect for the Caribbean climate.
          </p>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="brands-philosophy">
        <div className="container">
          <div className="philosophy-banner">
            <div className="philosophy-icon">✦</div>
            <blockquote className="philosophy-banner-quote">
              "With humility, not arrogance, we showcase only the top brands for our clients to experience."
            </blockquote>
            <p className="philosophy-attr">— Juno Montañez, Founder</p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="all-brands-grid">
            {brands.map(brand => (
              <BrandCard key={brand.id} {...brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="brands-partner-cta">
        <div className="container">
          <div className="partner-cta-inner">
            <div>
              <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Custom Solutions</p>
              <h2 className="heading-section" style={{ color: 'var(--color-white)', fontSize: '2rem', marginTop: '0.5rem' }}>
                Don't See What You Need?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem' }}>
                We source custom solutions for unique projects. Let's talk about your vision.
              </p>
            </div>
            <Link to="/contact-us" className="btn btn-wood">
              <span>CONTACT US</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
