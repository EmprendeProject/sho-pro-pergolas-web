import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import './Portfolio.css';
import './ContactUs.css';

export default function ContactUs() {
  return (
    <div className="contact-page">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Let's Talk</p>
          <h1 className="heading-section page-header-title" style={{ color: 'var(--color-white)' }}>
            CONTACT US
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.75rem', maxWidth: '500px' }}>
            Ready to transform your outdoor space? Fill out the quote form or reach out directly. We'll bring your outdoor dream to life.
          </p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="section-padding">
        <div className="container">
          <div className="contact-layout">
            {/* Quote Form */}
            <div className="contact-form-col">
              <p className="section-label">Request a Quote</p>
              <h2 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                Start Your Project
              </h2>
              <div className="divider" style={{ marginBottom: '2rem' }} />
              <QuoteForm />
            </div>

            {/* Contact Info */}
            <aside className="contact-info-col">
              {/* Direct Contact */}
              <div className="contact-info-card">
                <h3 className="contact-info-title">Get in Touch</h3>
                <div className="contact-info-list">
                  <a href="tel:+17875302525" className="contact-info-item">
                    <div className="contact-info-icon">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="contact-info-label">Phone</span>
                      <span className="contact-info-value">+1 787-530-2525</span>
                    </div>
                  </a>
                  <a href="mailto:info@sho-pros.com" className="contact-info-item">
                    <div className="contact-info-icon">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="contact-info-label">Email</span>
                      <span className="contact-info-value">info@sho-pros.com</span>
                    </div>
                  </a>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="contact-info-label">Service Area</span>
                      <span className="contact-info-value">Puerto Rico & the Caribbean</span>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="contact-info-label">Response Time</span>
                      <span className="contact-info-value">Within 24-48 hours</span>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="contact-social">
                  <p className="contact-social-label">Follow Us</p>
                  <div className="contact-socials-row">
                    <a href="https://www.instagram.com/ShoProsOutdoors" target="_blank" rel="noreferrer" className="contact-social-link">
                      <Instagram size={18} />
                      <span>Instagram</span>
                    </a>
                    <a href="https://www.facebook.com/ShoProsOutdoors" target="_blank" rel="noreferrer" className="contact-social-link">
                      <Facebook size={18} />
                      <span>Facebook</span>
                    </a>
                    <a href="https://www.youtube.com/@ShoProsOutdoors" target="_blank" rel="noreferrer" className="contact-social-link">
                      <Youtube size={18} />
                      <span>YouTube</span>
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=17874083333&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="contact-social-link">
                      <MessageCircle size={18} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Promise Card */}
              <div className="promise-card">
                <blockquote className="promise-quote">
                  "We'll bring your outdoor dream to life!"
                </blockquote>
                <p className="promise-attr">— The Sho Pros Team</p>
                <div className="promise-features">
                  {['Free Consultation', 'Custom Design', 'Certified Install', 'Full Warranty'].map(f => (
                    <div key={f} className="promise-feature">
                      <span className="promise-dot" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
