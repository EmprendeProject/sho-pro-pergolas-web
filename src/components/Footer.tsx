import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ArrowRight, MessageCircle } from 'lucide-react';
import mainLogo from '../assets/logos/MAIN Logo.png';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top CTA Band */}
      <div className="footer-cta-band">
        <div className="container">
          <div className="footer-cta-content">
            <div>
              <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Ready to Transform?</p>
              <h2 className="heading-section footer-cta-title">
                Let's Build Your Dream<br />Outdoor Space
              </h2>
            </div>
            <Link to="/contact-us" className="btn btn-outline-white">
              <span>Get a Free Quote</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src={mainLogo} alt="Sho-Pros" className="footer-logo-img" />
              </div>
              <p className="footer-tagline">
                Premium custom pergolas, motorized shades, and luxury outdoor living systems for Puerto Rico & the Caribbean.
              </p>
              <div className="footer-socials">
                <a href="https://www.instagram.com/ShoProsOutdoors" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/ShoProsOutdoors" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="https://www.youtube.com/@ShoProsOutdoors" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
                <a href="https://api.whatsapp.com/send/?phone=17874083333&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="footer-section">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-links">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'About Us', path: '/about-us' },
                  { label: 'Portfolio', path: '/portfolio' },
                  { label: 'Our Brands', path: '/our-brands' },
                  { label: 'Library', path: '/library' },
                  { label: 'Videos', path: '/videos' },
                ].map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div className="footer-section">
              <h4 className="footer-heading">Our Brands</h4>
              <ul className="footer-links">
                {['StruXure', 'Azenco Outdoor', 'Progressive Screens', 'Renlita', 'LiquidView', 'Haven & Harmony', 'Infinity Rack', 'HD Golf'].map(b => (
                  <li key={b}><span className="footer-link-plain">{b}</span></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-contact-list">
                <li>
                  <Phone size={15} />
                  <a href="tel:+17875302525">+1 787-530-2525</a>
                </li>
                <li>
                  <Mail size={15} />
                  <a href="mailto:info@sho-pros.com">info@sho-pros.com</a>
                </li>
                <li>
                  <MapPin size={15} />
                  <span>Puerto Rico & the Caribbean</span>
                </li>
              </ul>
              <Link to="/contact-us" className="btn btn-wood btn-sm footer-quote-btn">
                <span>Request a Quote</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copy">© {year} Sho-Pros. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <span className="footer-legal-dot">·</span>
            <a href="#" className="footer-legal-link">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
