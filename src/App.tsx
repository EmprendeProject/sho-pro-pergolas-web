import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import OurBrands from './pages/OurBrands';
import Library from './pages/Library';
import AboutUs from './pages/AboutUs';
import Videos from './pages/Videos';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/our-brands" element={<OurBrands />} />
            <Route path="/library" element={<Library />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
