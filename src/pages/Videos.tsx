import { Link } from 'react-router-dom';
import { Play, ArrowRight, HelpCircle } from 'lucide-react';
import './Portfolio.css';
import './Videos.css';

const videos = [
  { id: 1, title: 'StruXure Pergola X — The Ultimate Outdoor System', brand: 'StruXure', duration: '3:42', youtubeId: 'dQw4w9WgXcQ', thumb: 'linear-gradient(135deg,#1a1a2e,#16213e)' },
  { id: 2, title: 'Azenco Aluminum Pergola Installation Time-Lapse', brand: 'Azenco', duration: '5:18', youtubeId: 'dQw4w9WgXcQ', thumb: 'linear-gradient(135deg,#2d4a1e,#1a3010)' },
  { id: 3, title: 'Progressive Screens — Hurricane Protection Demo', brand: 'Progressive Screens', duration: '4:05', youtubeId: 'dQw4w9WgXcQ', thumb: 'linear-gradient(135deg,#3d1a1a,#5c2e2e)' },
  { id: 4, title: 'LiquidView Digital Window — Stanford Research Overview', brand: 'LiquidView', duration: '6:22', youtubeId: 'dQw4w9WgXcQ', thumb: 'linear-gradient(135deg,#0f3460,#1a4a8a)' },
  { id: 5, title: 'Haven & Harmony Custom Porch Swings Showcase', brand: 'Haven & Harmony', duration: '2:55', youtubeId: 'dQw4w9WgXcQ', thumb: 'linear-gradient(135deg,#4a3728,#7a5c40)' },
  { id: 6, title: 'The Enclave — Signature Project Walkthrough', brand: 'StruXure', duration: '8:14', youtubeId: 'dQw4w9WgXcQ', thumb: 'linear-gradient(135deg,#1a1a1a,#2d2419)' },
  { id: 7, title: 'Renlita Vertical Doors — How They Work', brand: 'Renlita', duration: '3:30', youtubeId: 'dQw4w9WgXcQ', thumb: 'linear-gradient(135deg,#1c1c1c,#333)' },
  { id: 8, title: 'HD Golf Simulator — The Ultimate Home Golf Experience', brand: 'HD Golf', duration: '4:48', youtubeId: 'dQw4w9WgXcQ', thumb: 'linear-gradient(135deg,#0d3d1f,#1a6b35)' },
];

const howToSteps = [
  { step: 1, title: 'Visit our contact page', desc: 'Go to the Contact Us section and fill in your basic info.' },
  { step: 2, title: 'Complete the quote form', desc: 'Tell us your location, role, and interests through our 5-step form.' },
  { step: 3, title: 'Upload your plans', desc: 'Share floor plans or photos of your outdoor space if available.' },
  { step: 4, title: 'We\'ll reach out', desc: 'Our team will contact you within 24-48 hours to schedule a consultation.' },
];

export default function Videos() {
  return (
    <div className="videos-page">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Watch & Learn</p>
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
              <div className="videos-grid">
                {videos.map(video => (
                  <article key={video.id} className="video-card">
                    <div className="video-thumb" style={{ background: video.thumb }}>
                      <button className="video-play-btn" aria-label="Play video">
                        <Play size={24} fill="currentColor" />
                      </button>
                      <span className="video-duration">{video.duration}</span>
                    </div>
                    <div className="video-info">
                      <span className="video-brand">{video.brand}</span>
                      <h3 className="video-title">{video.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar: How to request a quote */}
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
