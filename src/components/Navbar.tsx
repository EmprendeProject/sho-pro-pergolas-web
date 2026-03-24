import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Our Brands', path: '/our-brands' },
  { label: 'Library', path: '/library' },
  { label: 'Videos', path: '/videos' },
  { label: 'Contact Us', path: '/contact-us' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const toggleMobile = () => {
    setMobileOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : '';
      return !v;
    });
  };

  const isHome = location.pathname === '/';

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${!isHome ? 'solid' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-sho">SHO</span>
          <span className="logo-pros">PROS</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar-cta">
          <Link to="/contact-us" className="btn btn-primary btn-sm">
            <span>Get a Quote</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="navbar-toggle" onClick={toggleMobile} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {link.label}
              <ChevronDown size={16} />
            </Link>
          ))}
          <Link to="/contact-us" className="btn btn-primary mobile-cta">
            <span>Get a Quote</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
