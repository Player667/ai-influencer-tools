// src/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import App from '../App'; 

function LandingPage() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">turbolearn ai</div>
        <Link to="/signin" className="top-cta" target="_blank" rel="noopener noreferrer">
          Start today - It’s Free
        </Link>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1>Empower Influencers With AI.</h1>
            <p>
              Seamlessly connect with fans through personalized content, 
              insights, and engagement tools powered by AI.
            </p>
            <Link to="/signin" className="cta-button" target="_blank" rel="noopener noreferrer">
              Get Started – It’s Free
            </Link>
          </div>

          <div className="hero-right">
            <img src="/phone-mock.png" alt="Phone preview" className="phone-image" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Turbolearn AI. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
