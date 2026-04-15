import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, X, ArrowRight, HelpCircle, Loader2, AlertCircle } from 'lucide-react';
import { useYouTubeVideos } from '../hooks/useYouTubeVideos';
import './Portfolio.css';
import './Videos.css';

const howToSteps = [
  { step: 1, title: 'Visit our contact page', desc: 'Go to the Contact Us section and fill in your basic info.' },
  { step: 2, title: 'Complete the quote form', desc: 'Tell us your location, role, and interests through our 5-step form.' },
  { step: 3, title: 'Upload your plans', desc: 'Share floor plans or photos of your outdoor space if available.' },
  { step: 4, title: "We'll reach out", desc: 'Our team will contact you within 24-48 hours to schedule a consultation.' },
];

export default function Videos() {
  const { videos, loading, error } = useYouTubeVideos();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="videos-page">
      {/* Lightbox */}
      {activeId && (
        <div className="yt-lightbox" onClick={() => setActiveId(null)}>
          <div className="yt-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="yt-lightbox-close" onClick={() => setActiveId(null)} aria-label="Close">
              <X size={22} />
            </button>
            <div className="yt-lightbox-embed">
              <iframe
                src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="page-header">
        <div className="container">
          <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Watch &amp; Learn</p>
          <h1 className="heading-section page-header-title" style={{ color: 'var(--color-white)' }}>
            VIDEOS
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.75rem', maxWidth: '500px' }}>
            Product showcases, installation time-lapses, and signature project walkthroughs.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <section className="section-padding">
        <div className="container">
          <div className="videos-layout">
            {/* Video Grid */}
            <div className="videos-main">

              {loading && (
                <div className="yt-state">
                  <Loader2 size={36} className="yt-spinner" />
                  <p>Loading videos…</p>
                </div>
              )}

              {error && (
                <div className="yt-state yt-error">
                  <AlertCircle size={36} />
                  <p>{error}</p>
                </div>
              )}

              {!loading && !error && videos.length === 0 && (
                <div className="yt-state">
                  <p>No videos found.</p>
                </div>
              )}

              {!loading && !error && videos.length > 0 && (
                <div className="videos-grid">
                  {videos.map(video => (
                    <article key={video.id} className="video-card" onClick={() => setActiveId(video.id)}>
                      <div className="video-thumb">
                        {video.thumbnail ? (
                          <img src={video.thumbnail} alt={video.title} className="video-thumb-img" />
                        ) : (
                          <div className="video-thumb-placeholder" />
                        )}
                        <button className="video-play-btn" aria-label="Play video">
                          <Play size={24} fill="currentColor" />
                        </button>
                      </div>
                      <div className="video-info">
                        <h3 className="video-title">{video.title}</h3>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="videos-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-header">
                  <HelpCircle size={20} />
                  <h3 className="sidebar-title">How to Request<br />a Quote</h3>
                </div>
                <p className="sidebar-sub">Follow these simple steps to get your custom outdoor solution started.</p>
                <div className="how-to-steps">
                  {howToSteps.map(s => (
                    <div key={s.step} className="how-step">
                      <div className="how-step-num">{s.step}</div>
                      <div>
                        <h4 className="how-step-title">{s.title}</h4>
                        <p className="how-step-desc">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/contact-us" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
                  <span>GET A QUOTE</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
