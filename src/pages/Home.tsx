import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Phone, Mail, MessageSquare, MapPin, ClipboardList, HardHat, Wrench, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { testimonials, signatureProjects, homeFaqs, brands } from '../data/content';
import imgSig1 from '../assets/signature projects/signatureproject1.png';
import imgSig2 from '../assets/signature projects/signatureproject2.png';
import imgSig3 from '../assets/signature projects/signatureproject3.png';
import ImageWithFallback from '../components/ImageWithFallback';
import { localBrandLogos } from '../utils/localAssets';
import './Home.css';

const projectImages: Record<string, string> = {
  enclave: imgSig1,
  bachelorette: imgSig2,
  pearl: imgSig3,
};

const procesSteps = [
  { num: '01', step: 'STEP 1', label: 'Submit project inquiry', title: 'CONTACT US', icon: 'phone' },
  { num: '02', step: 'STEP 2', label: 'Preliminary project estimate', title: 'CONSULT', icon: 'chat' },
  { num: '03', step: 'STEP 3', label: 'Onsite measurements', title: 'SITE VISIT', icon: 'home' },
  { num: '04', step: 'STEP 4', label: 'Approve final proposal & deposit', title: 'FINALIZE DESIGN', icon: 'clipboard' },
  { num: '05', step: 'STEP 5', label: 'Custom-built, 3–4 month lead time', title: 'PRODUCTION', icon: 'hard-hat' },
  { num: '06', step: 'STEP 6', label: 'Delivery and professional installation', title: 'INSTALLATION', icon: 'wrench' },
];

const getLogoSources = (id: string, name: string) => {
  const localLogo = localBrandLogos[id];
  const cloudFolderName = name === 'Azenco Outdoor' ? 'Azenco' : name.replace(/\s+/g, '');
  const basePathCloud = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(name)}`;
  const basePathCloudClean = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(cloudFolderName)}`;
  const basePathCloudId = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(id)}`;

  return [
    localLogo,
    `${basePathCloud}/logo.png`,
    `${basePathCloud}/logo.jpeg`,
    `${basePathCloud}/logo.jpg`,
    `${basePathCloud}/logo.PNG`,
    `${basePathCloudClean}/logo.png`,
    `${basePathCloudClean}/logo.jpeg`,
    `${basePathCloudClean}/logo.jpg`,
    `${basePathCloudId}/logo.png`,
    `${basePathCloudId}/logo.jpeg`,
    `${basePathCloudId}/logo.jpg`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(name)}.png`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(name)}.jpeg`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(id)}.png`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(id)}.jpeg`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/brands%20(logos)/${encodeURIComponent(name)}%20logo.png`,
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/logos/${id}.png`
  ].filter(Boolean) as string[];
};

function renderAnswer(text: string) {
  const parts = text.split(/(\*\*[\s\S]*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function Home() {
  const [testIdx, setTestIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
            src="https://player.vimeo.com/video/1183460886?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=1080p"
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
              Luxury Pergolas &<br />Outdoor<br />Solutions
            </h1>
            <div className="hero-actions">
              <Link to="/contact-us" className="btn-hero-primary">
                Start Your Project
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
                Sho-Pros is an award-winning outdoor solution dealership specializing in luxury residential and commercial installations across Puerto Rico and the Caribbean.
              </p>
              <p className="who-body">
                We offer pergolas, carports, motorized screens, and other outdoor solutions from top-tier brands, selected for quality, durability, and clean design. Our systems are made to impress and built to last.
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
          <h2 className="sig-heading">Signature projects</h2>

          {/* Image cards for projects with photos */}
          <div className="sig-cards">
            {signatureProjects
              .filter(proj => projectImages[proj.id])
              .map(proj => (
                <Link key={proj.id} to="/portfolio" className="sig-card">
                  <img src={projectImages[proj.id]} alt={proj.name} className="sig-card-img" />
                  <div className="sig-card-overlay">
                    <h3 className="sig-card-name">{proj.name}</h3>
                    <span className="sig-card-category">{proj.subtitle}</span>
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
          <div className="process-top">
            <p className="sig-label">OUR PROCESS</p>
            <h2 className="process-heading">
              From First Call to <span className="process-heading-accent">Final Experience</span>
            </h2>
          </div>

          <div className="process-timeline">
            {procesSteps.map((step, i) => (
              <div key={step.num} className="process-step">
                {/* connector line (not on last item) */}
                {i < procesSteps.length - 1 && <div className="process-connector" />}

                {/* label above */}
                <p className="process-step-label">{step.label}</p>

                {/* icon circle */}
                <div className="process-icon-wrap">
                  {step.icon === 'phone' && <Phone size={22} />}
                  {step.icon === 'chat' && <MessageSquare size={22} />}
                  {step.icon === 'home' && <MapPin size={22} />}
                  {step.icon === 'clipboard' && <ClipboardList size={22} />}
                  {step.icon === 'hard-hat' && <HardHat size={22} />}
                  {step.icon === 'wrench' && <Wrench size={22} />}
                  {step.icon === 'star' && <Sparkles size={22} />}
                </div>

                {/* step info below */}
                <div className="process-step-info">
                  <span className="process-step-num">{step.step}</span>
                  <span className="process-step-title">{step.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="process-cta">
            <Link to="/contact-us" className="btn-hero-primary">
              Start Your Project
            </Link>
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
            {[...brands, ...brands].map((b, i) => (
              <div key={i} className="brand-marquee-item">
                <div className="brand-marquee-logo">
                  <ImageWithFallback 
                    sources={getLogoSources(b.id, b.name)} 
                    alt={b.name} 
                    className="brand-marquee-img" 
                    fallbackText={b.name}
                  />
                </div>
                <span className="brand-marquee-name">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h2 className="faq-title">FAQs</h2>
          </div>
          <div className="faq-accordion">
            {homeFaqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="faq-icon" size={20} />
                  ) : (
                    <ChevronDown className="faq-icon" size={20} />
                  )}
                </button>
                <div
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: openFaq === index ? '500px' : '0',
                    opacity: openFaq === index ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.4s ease-in-out'
                  }}
                >
                  <p className="faq-answer">{renderAnswer(faq.answer)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT US CTA ── */}
      <section className="home-contact-band">
        <div className="container">
          <h2 className="contact-band-title">CONTACT US NOW</h2>
          <div className="contact-band-info">
            <a href="tel:+17875302525" className="contact-band-link">
              <Phone size={16} />
              <span>Phone Number: +1 787-530-2525</span>
            </a>
            <a href="mailto:info@sho-pros.com" className="contact-band-link">
              <Mail size={16} />
              <span>Email: info@sho-pros.com</span>
            </a>
          </div>
          <div className="contact-band-actions">
            <Link to="/contact-us" className="btn-hero-primary">Start Your Project</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
