import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../LandingPage.css'; // Ensure the path is correct

import AppStoreBadge from '../Images/appstore-badge.png';
import GooglePlayBadge from '../Images/playstore-badge.png';
import DemoVideo from '../Images/demo2.mp4';

function LandingPage() {
  const navigate = useNavigate(); // Initialize the navigation hook

  // Function to handle CTA button click
  const handleCTAClick = () => {
    navigate('/signup'); // Redirect to the Sign-Up page
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <span className="brand-name">influ.ai</span>
        </div>
        <button className="nav-btn" onClick={handleCTAClick}>
          Start today – It’s Free
        </button>
      </nav>

      {/* Hero Section (centered) */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Let AI amplify your influence</h1>
          <p className="hero-subtext">
            Instant AI-powered content creation, audience insights, and influencer analytics.
          </p>
          <div className="store-badges">
            <img src={AppStoreBadge} alt="App Store" className="badge" />
            <img src={GooglePlayBadge} alt="Google Play" className="badge" />
          </div>

          {/* Purple Gradient Box with Demo Video */}
          <div className="gradient-box">
            <video
              className="demo-video"
              src={DemoVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
