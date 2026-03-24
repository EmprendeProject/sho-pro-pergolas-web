import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';
import { testimonials, signatureProjects } from '../data/content';
import imgHurricane from '../assets/brands/hurricane.png';
import imgInfinity from '../assets/brands/infinity.png';
import imgLiquidview from '../assets/brands/liquidview.png';
import imgProgressive from '../assets/brands/progressive.png';
import imgRenlita from '../assets/brands/renlita.png';
import imgSig1 from '../assets/signature projects/signatureproject1.png';
import imgSig2 from '../assets/signature projects/signatureproject2.png';
import './Home.css';

const projectImages: Record<string, string> = {
  enclave: imgSig1,
  bachelorette: imgSig2,
};

const procesSteps = [
  { num: '01', title: 'Initial Consultation', desc: 'We start by understanding your vision, budget, and outdoor space. No pressure — just a real conversation.' },
  { num: '02', title: 'Design & Selection', desc: 'Our team creates a custom layout and helps you select the perfect brand and product for your needs.' },
  { num: '03', title: 'Proposal & Contract', desc: "You receive a clear, itemized quote. No surprises. We move forward only when you're fully confident." },
  { num: '04', title: 'Fabrication', desc: 'Your system is custom fabricated to exact measurements — built to last through Caribbean weather.' },
  { num: '05', title: 'Installation', desc: 'Our certified crew installs with precision and care, keeping your space clean throughout the process.' },
  { num: '06', title: 'Final Walk-Through', desc: 'We walk through every detail with you, ensure everything works perfectly, and leave you with full documentation.' },
];

const brandLogos = [
  { name: 'Hurricane', img: imgHurricane },
  { name: 'Infinity Rack', img: imgInfinity },
  { name: 'LiquidView', img: imgLiquidview },
  { name: 'Progressive Screens', img: imgProgressive },
  { name: 'Renlita', img: imgRenlita },
];

export default function Home() {
  const [testIdx, setTestIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTestIdx(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const prevTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTestIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  };

  const nextTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTestIdx(i => (i + 1) % testimonials.length);
  };

  const t = testimonials[testIdx];

  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <iframe
            src="https://player.vimeo.com/video/1176602144?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=1080p"
            className="hero-video"
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="Hero background video"
          />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <div className="hero-inner">
            <p className="hero-eyebrow">Puerto Rico & The Caribbean</p>
            <h1 className="hero-title">
              Luxury Pergolas &<br />Outdoor Shade<br />Solutions
            </h1>
            <p className="hero-sub">
              Sho Pros is the premier destination for custom<br />
              pergolas, carports, and motorized shades in<br />
              Puerto Rico and the Caribbean.
            </p>
            <div className="hero-actions">
              <Link to="/contact-us" className="btn-hero-primary">
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="who-section">
        <div className="container">
          <div className="who-grid">
            <div className="who-text">
              <h2 className="who-heading">Who We Are</h2>
              <div className="who-divider" />
              <p className="who-body">
                Sho Pros is the premier destination for custom pergolas, carports, and motorized shades in Puerto Rico and the Caribbean. Our designs are made to impress and built to last.
              </p>
              <p className="who-body">
                More than just shade, we create spaces where you gather, relax, and enjoy life. With humility, not arrogance, we showcase only the top brands for our clients to experience.
              </p>
              <Link to="/about-us" className="who-link">
                Learn our story <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE PROJECTS ── */}
      <section className="sig-section">
        <div className="container">
          <p className="sig-label">SIGNATURE PROJECTS</p>

          {/* Image cards for projects with photos */}
          <div className="sig-cards">
            {signatureProjects
              .filter(proj => projectImages[proj.id])
              .map(proj => (
                <Link key={proj.id} to="/portfolio" className="sig-card">
                  <img src={projectImages[proj.id]} alt={proj.name} className="sig-card-img" />
                  <div className="sig-card-overlay">
                    <span className="sig-card-category">{proj.category}</span>
                    <h3 className="sig-card-name">{proj.name}</h3>
                  </div>
                </Link>
              ))}
          </div>

          <div className="sig-cta">
            <Link to="/portfolio" className="btn-outline-dark">
              SEE OUR PORTFOLIO
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ── */}
      <section className="process-section">
        <div className="container">
          <div className="process-header">
            <h2 className="process-heading">
              Our Process<br />
              <span className="process-heading-accent">Your Experience</span>
            </h2>
            <div className="process-header-right">
              <p className="process-sub">
                From the first conversation to the final walk-through — we're with you every step of the way.
              </p>
              <Link to="/contact-us" className="btn-hero-primary" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>
                Get Started
              </Link>
            </div>
          </div>
          <div className="process-grid">
            {procesSteps.map(step => (
              <div key={step.num} className="process-card">
                <span className="process-num">{step.num}</span>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT PEOPLE ARE SAYING ── */}
      <section className="testimonials-v2">
        <div className="container">
          <div className="test2-header">
            <h2 className="test2-heading">What People <em>Are Saying</em></h2>
            <div className="test2-nav">
              <button onClick={prevTest} className="test2-arrow" aria-label="Previous"><ChevronLeft size={20} /></button>
              <button onClick={nextTest} className="test2-arrow" aria-label="Next"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="test2-card" key={t.id}>
            <div className="test2-stars">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <blockquote className="test2-quote">"{t.quote}"</blockquote>
            <p className="test2-author">— {t.name}</p>
          </div>
          <div className="test2-dots">
            {testimonials.map((_, i) => (
              <button key={i} className={`test2-dot ${i === testIdx ? 'active' : ''}`} onClick={() => setTestIdx(i)} />
            ))}
          </div>
          <div className="test2-cta">
            <a href="https://www.google.com/maps/place/Sho-Pros/@22.8847962,-98.0605641,4z/data=!4m6!3m5!1s0x88d9031f3bd38883:0x468ee7509dd495ba!8m2!3d24.4229436!4d-76.4227338!16s%2Fg%2F11l3h7yjp8?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="btn-outline-gold">
              SEE MORE REVIEWS
            </a>
          </div>
        </div>
      </section>

      {/* ── BRAND LOGOS MARQUEE ── */}
      <section className="brand-marquee-section">
        <p className="brand-marquee-label">OUR BRANDS</p>
        <div className="brand-marquee-track-wrap">
          <div className="brand-marquee-track">
            {[...brandLogos, ...brandLogos].map((b, i) => (
              <div key={i} className="brand-marquee-item">
                <div className="brand-marquee-logo">
                  <img src={b.img} alt={b.name} className="brand-marquee-img" />
                </div>
                <span className="brand-marquee-name">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT US CTA ── */}
      <section className="home-contact-band">
        <div className="container">
          <h2 className="contact-band-title">CONTACT US NOW</h2>
          <p className="contact-band-sub">Turn your outdoor space into the lifestyle it deserves</p>
          <div className="contact-band-info">
            <a href="tel:+17875302525" className="contact-band-link">
              <Phone size={16} />
              <span>Company Phone Number: +1 787-530-2525</span>
            </a>
            <a href="mailto:info@sho-pros.com" className="contact-band-link">
              <Mail size={16} />
              <span>Email: info@sho-pros.com</span>
            </a>
          </div>
          <div className="contact-band-actions">
            <Link to="/contact-us" className="btn-hero-primary">Book a Free Consultation</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
