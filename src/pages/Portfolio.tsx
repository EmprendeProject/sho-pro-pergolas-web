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

  const signatureSpotlights = [
    {
      id: 'the-enclave',
      title: 'StruXure: The Enclave',
      desc: 'Award-winning project recognized for its striking design. Features a cantilever motorized louvered pergola with three supporting columns.'
    },
    {
      id: 'the-bachelorette-house',
      title: 'Azenco: The Bachelorette House',
      desc: 'After winning viewers’ hearts on The Bachelorette, JoJo Fletcher and Jordan Rogers brought in Sho-Pros to create their modern outdoor living space.'
    },
    {
      id: 'the-pearl-penthouse',
      title: 'Azenco: The Pearl Penthouse',
      desc: 'The Peninsula penthouse in Condado was transformed with both motorized and static pergolas, providing flexible coverage atop one of the city’s most iconic luxury buildings.'
    },
    {
      id: 'barlovento',
      title: 'Progressive Screens: Barlovento',
      desc: 'Full-perimeter motorized retractable screens provide year-round protection from harsh sun and strong winds for this beachfront restaurant in the Dorado Ritz-Carlton.'
    }
  ];

  const spotlightProjects = signatureSpotlights.map(spot => {
    const proj = portfolioProjects.find(p => p.id === spot.id);
    return { ...spot, project: proj };
  }).filter(s => s.project);


  const filtered = portfolioProjects.filter(p => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Signature Projects') return p.signature;
    return p.category === activeCategory;
  });

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

  // Cloudinary Optimization Helper
  const getOptimizedUrl = (url: string, width: number) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`);
  };

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

      {/* ── Signature Spotlights ── */}
      {spotlightProjects.length > 0 && (
        <section className="section-padding" style={{ paddingBottom: 0, paddingTop: '4rem' }}>
          <div className="container">
            <h2 className="heading-section" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              Signature Projects
            </h2>
            <p style={{ color: 'var(--color-gray-500)', fontSize: '1.05rem', maxWidth: '600px' }}>
              A curated selection of our most iconic and sophisticated installations.
            </p>

            <div className="signature-spotlight-grid">
              {spotlightProjects.map((spot, idx) => {
                const proj = spot.project!;
                return (
                  <article 
                    key={spot.id} 
                    className={`spotlight-card ${idx === 0 ? 'spotlight-hero' : ''}`}
                  >
                    <div 
                      className="spotlight-img project-img project-img--photo"
                      onClick={() => openLightbox(proj.photos, 0)}
                      role="button"
                    >
                      <img src={getOptimizedUrl(proj.coverImage, 1000)} alt={spot.title} className="project-cover-img" loading="lazy" />
                      <div className="project-img-overlay">
                        <span className="project-view-gallery">
                          <Images size={16} />
                          View Gallery
                        </span>
                      </div>
                      <div className="spotlight-badge">Signature</div>
                    </div>
                    <div className="spotlight-info">
                      <h3 className="spotlight-name">{spot.title}</h3>
                      <p className="spotlight-desc">{spot.desc}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

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
                    src={getOptimizedUrl(proj.coverImage, 800)}
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
              src={getOptimizedUrl(lightbox.photos[lightbox.index], 1920)}
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
                <img src={getOptimizedUrl(photo, 200)} alt={`Thumbnail ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
