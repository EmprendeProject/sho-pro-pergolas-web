import { useState } from 'react';
import { ArrowRight, Filter, X, ChevronLeft, ChevronRight, MapPin, Images, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioProjects, type ProjectCategory } from '../data/content';
import './Portfolio.css';

const ALL_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Signature Projects',
  'Residential Pergolas',
  'Commercial Pergolas',
  'Motorized Screens',
  'Motorized Doors',
  'Premium Carports',
];

const categoryAccent: Record<string, string> = {
  'Signature Projects':  'var(--color-wood)',
  'Residential Pergolas': '#2d5020',
  'Commercial Pergolas':  '#0f2d4a',
  'Motorized Screens':   '#3d2010',
  'Motorized Doors':     '#1a1a2e',
  'Premium Carports':    '#1a3028',
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null);

  const filtered = portfolioProjects.filter(p =>
    activeCategory === 'All' || p.category === activeCategory
  );

  // Lightbox helpers
  const openLightbox = (photos: string[], index: number) => {
    setLightbox({ photos, index });
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };
  const prevPhoto = () => setLightbox(lb => lb ? { ...lb, index: (lb.index - 1 + lb.photos.length) % lb.photos.length } : lb);
  const nextPhoto = () => setLightbox(lb => lb ? { ...lb, index: (lb.index + 1) % lb.photos.length } : lb);

  return (
    <div className="portfolio-page">

      {/* ── Page Header ── */}
      <section className="page-header">
        <div className="container">
          <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Our Work</p>
          <h1 className="heading-section page-header-title" style={{ color: 'var(--color-white)' }}>
            PORTFOLIO
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', marginTop: '0.75rem', maxWidth: '520px' }}>
            From luxury residences to high-end commercial properties across Puerto Rico and the Caribbean.
          </p>
        </div>
      </section>

      {/* ── Projects with Filters ── */}
      <section className="section-padding portfolio-projects-section">
        <div className="container">

          {/* Filter bar */}
          <div className="portfolio-filters-wrap">
            <div className="filter-label">
              <Filter size={14} />
              <span>Filter by</span>
            </div>
            <div className="portfolio-filters">
              {ALL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className="portfolio-count">
            Showing <strong>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && <> in <em>{activeCategory}</em></>}
          </p>

          {/* Grid */}
          <div className="projects-grid">
            {filtered.map(proj => (
              <article
                key={proj.id}
                className={`project-card ${proj.signature ? 'is-signature' : ''}`}
              >
                {/* Cover image */}
                <div
                  className="project-img project-img--photo"
                  onClick={() => openLightbox(proj.photos, 0)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && openLightbox(proj.photos, 0)}
                  aria-label={`View gallery for ${proj.name}`}
                >
                  <img
                    src={proj.coverImage}
                    alt={proj.name}
                    className="project-cover-img"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="project-img-overlay">
                    <span className="project-view-gallery">
                      <Images size={16} />
                      View {proj.photos.length} photo{proj.photos.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {proj.signature && <div className="signature-badge-tag">Signature</div>}
                  <div
                    className="project-category-badge"
                    style={{ background: categoryAccent[proj.category] ?? '#333' }}
                  >
                    {proj.category}
                  </div>
                </div>

                {/* Info */}
                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-brand">{proj.brand}</span>
                    <span className="project-location">
                      <MapPin size={11} />
                      {proj.location}
                    </span>
                  </div>
                  <h3 className="project-name">{proj.name}</h3>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="portfolio-empty">No projects in this category yet.</div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
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

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-controls" onClick={e => e.stopPropagation()}>
            <a
              href={`${lightbox.photos[lightbox.index]}?download=`}
              className="lightbox-action-btn"
              aria-label="Download"
              download
            >
              <Download size={22} />
            </a>
            <button className="lightbox-action-btn" onClick={closeLightbox} aria-label="Close">
              <X size={24} />
            </button>
          </div>

          <button
            className="lightbox-arrow lightbox-arrow--prev"
            onClick={e => { e.stopPropagation(); prevPhoto(); }}
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.photos[lightbox.index]}
              alt={`Photo ${lightbox.index + 1}`}
              className="lightbox-img"
            />
            <p className="lightbox-counter">
              {lightbox.index + 1} / {lightbox.photos.length}
            </p>
          </div>

          <button
            className="lightbox-arrow lightbox-arrow--next"
            onClick={e => { e.stopPropagation(); nextPhoto(); }}
            aria-label="Next"
          >
            <ChevronRight size={32} />
          </button>

          {/* Thumbnail strip */}
          <div className="lightbox-thumbs" onClick={e => e.stopPropagation()}>
            {lightbox.photos.map((photo, i) => (
              <button
                key={i}
                className={`lightbox-thumb ${i === lightbox.index ? 'active' : ''}`}
                onClick={() => setLightbox({ ...lightbox, index: i })}
              >
                <img src={photo} alt={`Thumbnail ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
