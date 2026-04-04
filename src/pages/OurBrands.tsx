
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

      {/* Brands Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="all-brands-grid">
            {brands.map((brand, i) => (
              <BrandCard key={brand.id} {...brand} index={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
