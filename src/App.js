import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">turbolearn ai</div>
        <a href="/" className="top-cta">Start today - It’s Free</a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1>Empower Influencers With AI.</h1>
            <p>
            Seamlessly connect with fans through personalized content, 
            insights, and engagement tools powered by AI.
            </p>
            <a href="/" className="cta-button">Get Started – It’s Free</a>

          </div>
          <div className="hero-right">
            <img
              src="/phone-mock.png"
              alt="Phone preview of turbolearn ai"
              className="phone-image"
            />
          </div>
        </div>
      </section>

      <section className="trusted-by">
        <p>Trusted by students at 5,000+ colleges</p>
        <div className="university-logos">
          <img src="/princeton.png" alt="Princeton University" />
          <img src="/stanford.png" alt="Stanford University" />
          <img src="/oxford.png" alt="University of Oxford" />
          <img src="/mit.png" alt="MIT" />
          <img src="/texas.png" alt="The University of Texas at Austin" />
          <img src="/duke.png" alt="Duke University" />
        </div>
      </section>

      <footer className="footer">
        &copy; 2025 Turbolearn AI. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
