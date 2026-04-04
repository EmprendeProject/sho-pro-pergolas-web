import { useState } from 'react';
import { Search, Download, FileText, BookOpen, Award, ShieldCheck, Wrench } from 'lucide-react';
import { libraryDocs } from '../data/content';
import './Portfolio.css';
import './Library.css';

const allBrands = ['All', ...Array.from(new Set(libraryDocs.map(d => d.brand)))];
const allCategories = ['All', ...Array.from(new Set(libraryDocs.map(d => d.category)))];

function CategoryIcon({ category }: { category: string }) {
  switch (category) {
    case 'Brochure':      return <BookOpen size={15} />;
    case 'Specifications': return <FileText size={15} />;
    case 'Guide':          return <Wrench size={15} />;
    case 'Certifications': return <Award size={15} />;
    case 'Warranty':       return <ShieldCheck size={15} />;
    default:               return <FileText size={15} />;
  }
}

function categoryClass(category: string): string {
  switch (category) {
    case 'Brochure':       return 'brochure';
    case 'Specifications': return 'specs';
    case 'Guide':          return 'guide';
    case 'Certifications': return 'cert';
    case 'Warranty':       return 'warranty';
    default:               return '';
  }
}

export default function Library() {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('All');
  const [category, setCategory] = useState('All');

  const filtered = libraryDocs.filter(doc => {
    const matchSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.brand.toLowerCase().includes(search.toLowerCase());
    const matchBrand = brand === 'All' || doc.brand === brand;
    const matchCat = category === 'All' || doc.category === category;
    return matchSearch && matchBrand && matchCat;
  });

  const handleDownload = (doc: typeof libraryDocs[0]) => {
    const a = document.createElement('a');
    a.href = doc.filePath;
    a.download = doc.name + '.pdf';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="library-page">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <p className="section-label" style={{ color: 'var(--color-wood-light)' }}>Technical Resources</p>
          <h1 className="heading-section page-header-title" style={{ color: 'var(--color-white)' }}>
            LIBRARY
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.75rem', maxWidth: '500px' }}>
            Brochures, technical specifications, and product documentation for all our brands.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="library-filters-section">
        <div className="container">
          <div className="library-filters">
            {/* Search */}
            <div className="lib-search">
              <Search size={16} className="lib-search-icon" />
              <input
                type="text"
                placeholder="Search documents..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="lib-search-input"
              />
            </div>

            {/* Brand filter */}
            <div className="lib-filter-group">
              <span className="lib-filter-label">Brand:</span>
              <div className="lib-filter-pills">
                {allBrands.map(b => (
                  <button
                    key={b}
                    className={`filter-btn ${brand === b ? 'active' : ''}`}
                    onClick={() => setBrand(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div className="lib-filter-group">
              <span className="lib-filter-label">Type:</span>
              <div className="lib-filter-pills">
                {allCategories.map(c => (
                  <button
                    key={c}
                    className={`filter-btn ${category === c ? 'active' : ''}`}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="section-padding" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="lib-results-count">
            {filtered.length} document{filtered.length !== 1 ? 's' : ''} found
          </div>
          <div className="lib-table-wrapper">
            <table className="lib-table">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Document Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Year</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(doc => (
                  <tr key={doc.id} className="lib-row">
                    <td>
                      <span className="lib-brand-pill">{doc.brand}</span>
                    </td>
                    <td>
                      <div className="lib-doc-name">
                        <CategoryIcon category={doc.category} />
                        <span>{doc.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`lib-category-tag ${categoryClass(doc.category)}`}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="lib-size">{doc.fileSize}</td>
                    <td className="lib-year">{doc.year}</td>
                    <td>
                      <button
                        className="lib-download-btn"
                        title={`Download ${doc.name}`}
                        onClick={() => handleDownload(doc)}
                      >
                        <Download size={15} />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="lib-empty">No documents match your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
