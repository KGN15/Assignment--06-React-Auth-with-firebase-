import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../style/home.css'

const Home = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <>

      <div className="home-root">
        {/* Background */}
        <div className="grid-lines" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="corner-mark corner-tl" />
        <div className="corner-mark corner-br" />

        {/* Content */}
        <div className="home-card">
          <div className={`eyebrow ${mounted ? 'show' : ''}`}>
            <span className="eyebrow-line" />
            Personal Dashboard
            <span className="eyebrow-line right" />
          </div>

          <h1 className={`home-headline ${mounted ? 'show' : ''}`}>
            Your private<br /><em>space awaits.</em>
          </h1>

          <p className={`home-sub ${mounted ? 'show' : ''}`}>
            Curated. Secure. Entirely yours.
          </p>

          <div className={`home-divider ${mounted ? 'show' : ''}`}>
            <div className="home-divider-dot" />
          </div>

          <p className={`home-body ${mounted ? 'show' : ''}`}>
            Create an account to unlock your personal dashboard — manage your profile, 
            explore exclusive features, and keep everything that matters in one secure place.
          </p>

          <div className={`cta-row ${mounted ? 'show' : ''}`}>
            <Link to="/create" className="btn-primary-home">
              Create Account
              <span className="btn-arrow">→</span>
            </Link>
            
          </div>
        </div>

        {/* Trust row */}
        <div className={`trust-row ${mounted ? 'show' : ''}`}>
          <div className="trust-item">
            <div className="trust-dot" />
            End-to-end encrypted
          </div>
          <div className="trust-item">
            <div className="trust-dot" />
            No data sold
          </div>
          <div className="trust-item">
            <div className="trust-dot" />
            Always private
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;