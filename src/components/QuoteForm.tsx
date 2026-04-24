import { useState, useRef } from 'react';
import {
  ChevronRight, ChevronLeft, Check, Upload, User, Briefcase,
  Wrench, Palette, Building2, MapPin, X
} from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import './QuoteForm.css';

const COUNTRIES = [
  'Puerto Rico',
  'Florida',
  'Caribbean',
];

const ROLES = [
  { id: 'owner', label: 'Property Owner', icon: User },
  { id: 'architect', label: 'Architect', icon: Briefcase },
  { id: 'contractor', label: 'Contractor', icon: Wrench },
  { id: 'interior', label: 'Interior Designer', icon: Palette },
  { id: 'business', label: 'Business Owner', icon: Building2 },
];

const INTERESTS = [
  'Pergolas', 'Motorized Shades', 'Solar Pergolas', 'Louvered Pergolas',
  'Retractable Screens', 'Carports', 'Cabanas', 'Hurricane Protection',
  'Outdoor Lighting', 'Glass Systems', 'Golf Simulators', 'Custom Swings',
];

const STEPS = ['Location', 'Role', 'Interests', 'Files', 'Contact'];

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', zipCode: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleInterest = (item: string) => {
    setInterests(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...dropped]);
  };

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const next = () => { if (step < 5) setStep(s => s + 1); };
  const prev = () => { if (step > 1) setStep(s => s - 1); };

  const canNext = () => {
    if (step === 1) return country !== '';
    if (step === 2) return role !== '';
    if (step === 3) return interests.length > 0;
    return true;
  };

  /** Upload a single File to Cloudinary and return its permanent public URL */
  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'sho_pros_uploads');
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/du2kej0xd/auto/upload',
        { method: 'POST', body: formData }
      );
      const json = await res.json();
      // Cloudinary returns: { secure_url: 'https://res.cloudinary.com/...' }
      return json?.secure_url ?? null;
    } catch {
      return null;
    }
  };

  const sendToPancakeCRM = async () => {
    const PANCAKE_API_KEY = '3f35589702424b48b8fa17cc699657a8';
    const SHOP_ID = '1942209558';
    const TABLE_NAME = 'Contact';

    const fileUrls = files.length > 0
      ? (await Promise.all(files.map(uploadFile))).filter(Boolean) as string[]
      : [];

    const roleName = ROLES.find(r => r.id === role)?.label || role;
    let noteText =
      `📍 Location: ${country}\n` +
      `🗺️ Zip Code: ${contact.zipCode || 'N/A'}\n` +
      `👤 Role: ${roleName}\n` +
      `✅ Interests: ${interests.join(', ')}\n` +
      `🌐 Source: Website Quote Form`;

    if (fileUrls.length > 0) {
      noteText += `\n📎 Files:\n` + fileUrls.join('\n');
    }

    const payload: Record<string, unknown> = {
      Name: contact.name,
      Phone: contact.phone,
      Email: contact.email,
      Note: noteText,
      zip_code: contact.zipCode || '',
      city: country,
    };

    try {
      await fetch(
        `https://pos.pages.fm/api/v1/shops/${SHOP_ID}/crm/${TABLE_NAME}/records?api_key=${PANCAKE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
    } catch {
      // Silently fail – never block the user experience
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert('Please complete the CAPTCHA first.');
      return;
    }
    setSubmitting(true);
    await sendToPancakeCRM();
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="quote-form-success">
        <div className="success-icon"><Check size={40} /></div>
        <h3 className="heading-sub" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Thank You!</h3>
        <p className="body-text" style={{ textAlign: 'center' }}>
          Your request has been received! We'll reach out via phone or email shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="quote-form-wrapper">
      {/* Progress */}
      <div className="quote-progress">
        {STEPS.map((label, i) => (
          <div key={label} className={`progress-step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
            <div className="progress-dot">
              {step > i + 1 ? <Check size={12} /> : <span>{i + 1}</span>}
            </div>
            <span className="progress-label">{label}</span>
          </div>
        ))}
        <div className="progress-line">
          <div className="progress-fill" style={{ width: `${((step - 1) / 4) * 100}%` }} />
        </div>
      </div>

      {/* Step Content */}
      <div className="quote-step-content">
        {/* Step 1: Country */}
        {step === 1 && (
          <div className="quote-step animate-fade-in-up">
            <h3 className="quote-step-title">Where are you located?</h3>
            <p className="quote-step-subtitle">Select your country or region</p>
            <div className="country-grid">
              {COUNTRIES.map(c => (
                <button
                  key={c}
                  className={`country-btn ${country === c ? 'selected' : ''}`}
                  onClick={() => setCountry(c)}
                  type="button"
                >
                  <MapPin size={14} />
                  <span>{c}</span>
                  {country === c && <Check size={13} className="check-icon" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Role */}
        {step === 2 && (
          <div className="quote-step animate-fade-in-up">
            <h3 className="quote-step-title">What's your role?</h3>
            <p className="quote-step-subtitle">Help us tailor the experience for you</p>
            <div className="role-grid">
              {ROLES.map(r => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    className={`role-btn ${role === r.id ? 'selected' : ''}`}
                    onClick={() => setRole(r.id)}
                    type="button"
                  >
                    <Icon size={28} />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <div className="quote-step animate-fade-in-up">
            <h3 className="quote-step-title">What are you interested in?</h3>
            <p className="quote-step-subtitle">Select all that apply</p>
            <div className="interests-grid">
              {INTERESTS.map(item => (
                <button
                  key={item}
                  className={`interest-btn ${interests.includes(item) ? 'selected' : ''}`}
                  onClick={() => toggleInterest(item)}
                  type="button"
                >
                  {interests.includes(item) && <Check size={13} />}
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Upload */}
        {step === 4 && (
          <div className="quote-step animate-fade-in-up">
            <h3 className="quote-step-title">Upload plans or references</h3>
            <p className="quote-step-subtitle">Optional — share floor plans, photos, or inspiration</p>
            <div
              className={`dropzone ${dragging ? 'dragging' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={36} className="dropzone-icon" />
              <p className="dropzone-text">Drag & drop files here</p>
              <p className="dropzone-sub">or click to browse</p>
              <input
                ref={fileRef}
                type="file"
                multiple
                onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])}
                className="dropzone-input"
              />
            </div>
            {files.length > 0 && (
              <ul className="file-list">
                {files.map((f, i) => (
                  <li key={i} className="file-item">
                    <span className="file-name">{f.name}</span>
                    <button className="file-remove" onClick={() => removeFile(i)} type="button">
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Step 5: Contact */}
        {step === 5 && (
          <form className="quote-step animate-fade-in-up" onSubmit={handleSubmit}>
            <h3 className="quote-step-title">Your contact information</h3>
            <p className="quote-step-subtitle">We'll use this to get back to you</p>
            <div className="contact-fields">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={contact.name}
                  onChange={e => setContact(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={contact.email}
                  onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Phone *</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="+1 (787) 000-0000"
                  required
                  value={contact.phone}
                  onChange={e => setContact(p => ({ ...p, phone: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Zip Code</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="00901"
                  value={contact.zipCode}
                  onChange={e => setContact(p => ({ ...p, zipCode: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="recaptcha-wrapper" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>

            <button type="submit" className="btn btn-primary quote-submit-btn" disabled={submitting || !captchaToken}>
              {submitting ? (
                <><span>Sending...</span><span className="spinner" /></>
              ) : (
                <><span>Submit Request</span><Check size={16} /></>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Navigation */}
      {step < 5 && (
        <div className="quote-nav">
          <button
            className="btn btn-outline quote-nav-btn"
            onClick={prev}
            disabled={step === 1}
            type="button"
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>
          <button
            className={`btn btn-primary quote-nav-btn ${!canNext() ? 'disabled' : ''}`}
            onClick={next}
            disabled={!canNext()}
            type="button"
          >
            <span>Continue</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
