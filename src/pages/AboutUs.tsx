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
  { year: '2018', label: 'Founded', desc: 'Sho-Pros brought the first high-tech hurricane fabric to PR. Eliminating the need for clunky metal shutters.' },
  { year: '2019', label: '', desc: 'Installed the first motorized pergola in Puerto Rico.' },
  { year: '2020', label: '', desc: 'Expanded operation across the Caribbean and Florida.' },
  { year: '2021', label: '', desc: 'Recognized as an award-winning dealership by StruXure.' },
  { year: '2024', label: '', desc: 'Completed over 300 residential and commercial installs.' },
  { year: 'Today', label: '', desc: 'Puerto Rico’s leading dealer of custom modern pergolas.' },
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
                  <img src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/About%20Us%20Photos/Juno%202%20STX.jpg`} alt="Juno Montañez" className="founder-photo-main" />
                </div>
                <div className="founder-img-accent">
                  <img src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/About%20Us%20Photos/juno%20avion.jpeg`} alt="Juno at work" className="founder-photo-accent" />
                </div>
              </div>
            </div>
            <div className="founders-content">
              <p className="section-label">The Founder</p>
              <h2 className="heading-section founders-title">
                Born From Passion,<br />Built on Excellence
              </h2>
              <div className="divider" />
              <p className="body-text">
                Sho-Pros was founded by Luis "Juno" Montañez after 15+ years in commercial leasing. Not your typical suit, Juno kitesurfs, walks on planes (yes, really), and hikes where most people wouldn’t dare.
              </p>
              <p className="body-text" style={{ marginTop: '1rem' }}>
                That same adventurous spirit inspired Sho-Pros in 2018. Frustrated with Puerto Rico’s outdated outdoor solutions, Juno saw an opportunity: create systems that impress, perform, and stand up to the island’s relentless weather.
              </p>
              <p className="body-text" style={{ marginTop: '1rem' }}>
                We introduced Puerto Rico’s first high-tech hurricane fabric. Next, we brought motorized shades with patented neodymium magnets that eliminate zippers and prevent snags. Today, Sho-Pros sets the standard for modern pergolas across Puerto Rico and the Caribbean.
              </p>
              <div className="founders-highlights">
                {["Puerto Rico's First Pergola Dealer", 'South Florida & Caribbean Coverage', '300+ Projects Completed', 'Hand-Selected Premium Brands'].map(h => (
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
              { title: 'What We Do', body: 'Sho-Pros designs and installs high-end outdoor systems built for comfort and style. From modern pergolas to motorized shades, we give you full control of your outdoor space. Every product is selected for durability, performance, and clean design.' },
              { title: 'How We Work', body: 'We don’t just sell outdoor systems, we tailor them to your space and vision. Our process starts with understanding your needs, followed by thoughtful design and sourcing the right products for the job.' },
              { title: 'Where We Work', body: 'Sho-Pros proudly serves Puerto Rico and the Caribbean, handling both residential and commercial projects. We also have a branch in South Florida.' },
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
            {/* <blockquote className="philosophy-main-quote">
              “Setting the standard for modern outdoor living.”
            </blockquote> */}
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
          <div className="section-header center" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="section-label">The People</p>
            <h2 className="heading-section" style={{ fontSize: '2rem' }}>MEET THE TEAM</h2>
            <div className="divider divider-center" />
          </div>
          <div className="team-grid">
            {team.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-avatar">
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/archivos/About%20Us%20Photos/${encodeURIComponent(member.imageFile)}`}
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
