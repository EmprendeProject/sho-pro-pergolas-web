import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { team } from '../data/content';
import './Portfolio.css';
import './AboutUs.css';

const values = [
  { icon: '🎯', title: 'Boutique Approach', desc: 'We treat every project as if it were going in our own backyard.' },
  { icon: '🏆', title: 'Top Brands Only', desc: 'We hand-select only the world\'s finest outdoor systems.' },
  { icon: '🌀', title: 'Caribbean-Ready', desc: 'All systems are tested and rated for our tropical weather.' },
  { icon: '🤝', title: 'Full Support', desc: 'From design through install — and well beyond.' },
];

const timeline = [
  { year: '2018', label: 'Founded', desc: 'Sho-Pros launches with hurricane fabric in Puerto Rico.' },
  { year: '2019', label: 'First Pergola', desc: 'Installed the first motorized pergola in Puerto Rico.' },
  { year: '2021', label: 'Caribbean Expansion', desc: 'Expanded operations across the Caribbean islands.' },
  { year: '2023', label: '500+ Projects', desc: 'Completed over 500 residential and commercial installs.' },
  { year: '2024', label: '#1 Dealer', desc: 'Named the No. 1 custom pergola dealer in the region.' },
];

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Our Story</p>
          <h1 className="heading-section page-header-title" style={{ color: 'var(--color-white)' }}>
            ABOUT US
          </h1>
        </div>
      </section>

      {/* Founders Story */}
      <section className="section-padding">
        <div className="container">
          <div className="founders-grid">
            <div className="founders-media">
              <div className="founders-img-stack">
                <div className="founder-img-main">
                  <img src={new URL('../assets/aboutus/Juno 3.jpg', import.meta.url).href} alt="Juno Montañez" className="founder-photo-main" />
                </div>
                <div className="founder-img-accent">
                  <img src={new URL('../assets/aboutus/Juno 2 STX.jpg', import.meta.url).href} alt="Juno at work" className="founder-photo-accent" />
                </div>
              </div>
            </div>
            <div className="founders-content">
              <p className="section-label">The Founders</p>
              <h2 className="heading-section founders-title">
                Born From Passion,<br />Built on Excellence
              </h2>
              <div className="divider" />
              <p className="body-text">
                Sho-Pros was founded by Luis "Juno" Montañez after 15+ years in commercial leasing. But Juno's not your typical suit — he kite surfs, walks on planes (yeah, really), and hikes in places most people avoid.
              </p>
              <p className="body-text" style={{ marginTop: '1rem' }}>
                That same edge led to Sho-Pros in 2018. Seeing Puerto Rico's outdoor spaces stuck with outdated solutions, Juno saw an opportunity. People needed systems that worked, impressed, and stood up to the island's unpredictable weather.
              </p>
              <p className="body-text" style={{ marginTop: '1rem' }}>
                We started with the first high-tech hurricane fabric. Then came motorized shades. And now? We're the only custom motorized pergola dealer in Puerto Rico and the Caribbean.
              </p>
              <div className="founders-highlights">
                {['Puerto Rico\'s #1 Pergola Dealer', 'Caribbean Coverage', '500+ Projects Completed', 'Hand-Selected Premium Brands'].map(h => (
                  <div key={h} className="highlight-item">
                    <CheckCircle size={16} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Banner */}
      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-grid">
            {[
              { title: 'What We Do', body: 'We design and install luxury outdoor living systems — from cutting-edge pergolas to sleek motorized shades that let you enjoy the view without the sunburn or surprise rain. Every product is hand-selected for durability, performance, and design.' },
              { title: 'How We Work', body: 'We don\'t just sell outdoor systems; we tailor them to your space and vision. Our process starts with listening to your needs, then designing the right solution and sourcing the best products. No corners cut.' },
              { title: 'Where We Work', body: 'Sho-Pros proudly serves Puerto Rico and the Caribbean, handling both residential and commercial projects. No job is too small or too custom for us to tackle.' },
            ].map(item => (
              <div key={item.title} className="what-item">
                <div className="what-dot" />
                <h3 className="what-title">{item.title}</h3>
                <p className="what-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header center" style={{ marginBottom: '4rem' }}>
            <p className="section-label">Our Journey</p>
            <h2 className="heading-section" style={{ fontSize: '2rem' }}>FROM IDEA TO INDUSTRY LEADER</h2>
            <div className="divider divider-center" />
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={item.year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h4 className="timeline-label">{item.label}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="philosophy-section">
        <div className="container">
          <div className="philosophy-center">
            <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Our Philosophy</p>
            <h2 className="heading-section" style={{ color: 'var(--color-white)', fontSize: '2rem', margin: '0.5rem 0' }}>
              WHY CHOOSE SHO-PROS?
            </h2>
            <div className="divider divider-center" />
            <blockquote className="philosophy-main-quote">
              "With humility, not arrogance, we showcase only the top brands for our clients to experience."
            </blockquote>
            <div className="values-grid">
              {values.map(v => (
                <div key={v.title} className="value-card">
                  <span className="value-icon">{v.icon}</span>
                  <h4 className="value-title">{v.title}</h4>
                  <p className="value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header center">
            <p className="section-label">The People</p>
            <h2 className="heading-section" style={{ fontSize: '2rem' }}>MEET THE TEAM</h2>
            <div className="divider divider-center" />
          </div>
          <div className="team-grid">
            {team.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-avatar">
                  <img 
                    src={new URL(`../assets/aboutus/${member.imageFile}`, import.meta.url).href} 
                    alt={member.name} 
                    className="team-avatar-img" 
                  />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: 'var(--color-black)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="heading-section" style={{ color: 'var(--color-white)', fontSize: '2rem', marginBottom: '1rem' }}>
            Ready to Work With Us?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem' }}>
            Let's turn your outdoor vision into reality.
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
