import { useState } from 'react';
import { ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { signatureProjects } from '../data/content';
import './Portfolio.css';

const categories = ['All', 'Residential', 'Commercial', 'Signature'];

const projects = [
  { id: 1, name: 'Casa Dorada Retreat', type: 'Residential', brand: 'StruXure', category: 'Pergola', emoji: '🏡', gradient: 'linear-gradient(135deg,#1a2d1a,#2d5020)' },
  { id: 2, name: 'Sunset Bay Hotel', type: 'Commercial', brand: 'Azenco', category: 'Cabana System', emoji: '🏨', gradient: 'linear-gradient(135deg,#0f1e3d,#1a3060)' },
  { id: 3, name: 'Villa Paradiso', type: 'Residential', brand: 'Progressive Screens', category: 'Retractable Screens', emoji: '🌴', gradient: 'linear-gradient(135deg,#3d2010,#6b3518)' },
  { id: 4, name: 'Ocean Club Rooftop', type: 'Commercial', brand: 'Azenco', category: 'Rooftop Pergola', emoji: '🌊', gradient: 'linear-gradient(135deg,#0a1a2e,#0f2d4a)' },
  { id: 5, name: 'Las Palmas Estate', type: 'Residential', brand: 'StruXure', category: 'Louvered Pergola', emoji: '🌿', gradient: 'linear-gradient(135deg,#1a2d10,#2d4a1a)' },
  { id: 6, name: 'Coral Reef Restaurant', type: 'Commercial', brand: 'Renlita', category: 'Vertical Doors', emoji: '🐚', gradient: 'linear-gradient(135deg,#2d1010,#4a1a1a)' },
  { id: 7, name: 'The Enclave', type: 'Residential', brand: 'StruXure', category: 'Signature', emoji: '🏛️', gradient: 'linear-gradient(135deg,#1a1a2e,#16213e)', signature: true },
  { id: 8, name: 'The Bachelorette House', type: 'Residential', brand: 'Azenco', category: 'Signature', emoji: '🌟', gradient: 'linear-gradient(135deg,#2d3010,#4a4a18)', signature: true },
  { id: 9, name: 'The Pearl Penthouse', type: 'Commercial', brand: 'Azenco', category: 'Signature', emoji: '💎', gradient: 'linear-gradient(135deg,#3d1f1f,#5c2e2e)', signature: true },
  { id: 10, name: 'Brisa Marina Condo', type: 'Residential', brand: 'Progressive Screens', category: 'Hurricane Screens', emoji: '🌬️', gradient: 'linear-gradient(135deg,#1a1a3d,#2d2d60)' },
  { id: 11, name: 'Hacienda del Rio', type: 'Residential', brand: 'Haven & Harmony', category: 'Porch Swings', emoji: '🪑', gradient: 'linear-gradient(135deg,#3d2010,#5c3018)' },
  { id: 12, name: 'The Grand Terrace', type: 'Commercial', brand: 'Infinity Rack', category: 'Solar Pergola', emoji: '☀️', gradient: 'linear-gradient(135deg,#1a2d1a,#1a4018)' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = projects.filter(p => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Signature') return p.signature;
    return p.type === activeCategory;
  });

  return (
    <div className="portfolio-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Our Work</p>
          <h1 className="heading-section page-header-title" style={{ color: 'var(--color-white)' }}>
            PORTFOLIO
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', marginTop: '0.75rem', maxWidth: '500px' }}>
            From luxury private residences to high-end commercial properties across Puerto Rico and the Caribbean.
          </p>
        </div>
      </section>

      {/* Signature Projects Spotlight */}
      <section className="section-padding">
        <div className="container">
          <p className="section-label">Featured</p>
          <h2 className="heading-section" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>SIGNATURE PROJECTS</h2>
          <div className="divider" />
          <div className="signature-spotlight-grid">
            {signatureProjects.map((proj, i) => (
              <article key={proj.id} className={`spotlight-card ${i === 0 ? 'spotlight-hero' : ''}`}>
                <div className="spotlight-img" style={{ background: i === 0 ? 'linear-gradient(135deg,#1a1a2e,#16213e)' : i === 1 ? 'linear-gradient(135deg,#2d4a1e,#1a3010)' : i === 2 ? 'linear-gradient(135deg,#3d1f1f,#5c2e2e)' : 'linear-gradient(135deg,#1a2d3d,#0f1e2d)' }}>
                  <span style={{ fontSize: i === 0 ? '6rem' : '4rem' }}>🏛️</span>
                  <div className="spotlight-badge">{proj.type}</div>
                </div>
                <div className="spotlight-info">
                  <span className="spotlight-brand">{proj.brand}</span>
                  <h3 className="spotlight-name">{proj.name}</h3>
                  <p className="spotlight-desc">{proj.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="section-padding" style={{ background: 'var(--color-gray-100)', paddingTop: '4rem' }}>
        <div className="container">
          <div className="portfolio-filters">
            <div className="filter-label">
              <Filter size={14} />
              <span>Filter by:</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filtered.map(proj => (
              <article key={proj.id} className={`project-card ${proj.signature ? 'is-signature' : ''}`}>
                <div className="project-img" style={{ background: proj.gradient }}>
                  <span className="project-emoji">{proj.emoji}</span>
                  {proj.signature && <div className="signature-badge-tag">Signature</div>}
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-brand">{proj.brand}</span>
                    <span className="project-category">{proj.category}</span>
                  </div>
                  <h3 className="project-name">{proj.name}</h3>
                  <span className="project-type">{proj.type}</span>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="portfolio-empty">No projects in this category yet.</div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding cta-band" style={{ background: 'var(--color-carbon)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="heading-section" style={{ color: 'var(--color-white)', fontSize: '2rem', marginBottom: '1rem' }}>
            Let's Create Your Project
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem' }}>
            Every installation is a signature project waiting to happen.
          </p>
          <Link to="/contact-us" className="btn btn-wood">
            <span>REQUEST A QUOTE</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
