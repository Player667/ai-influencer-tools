import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../LandingPage.module.css'; // Import the CSS module

import AppStoreBadge from '../Images/appstore-badge.png';
import GooglePlayBadge from '../Images/playstore-badge.png';
import DemoVideo from '../Images/demo2.mp4';


function LandingPage() {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/signup'); // Redirect to the Sign-Up page
  };

  return (
    <div className={styles.landingPage}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <span className={styles.brandName}>influ.ai</span>
        </div>
        <button className={styles.navBtn} onClick={handleCTAClick}>
          Start today – It’s Free
        </button>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Let AI amplify your influence</h1>
          <p className={styles.heroSubtext}>
            Instant AI-powered content creation, audience insights, and influencer analytics.
          </p>
          <div className={styles.storeBadges}>
            <img src={AppStoreBadge} alt="App Store" className={styles.badge} />
            <img src={GooglePlayBadge} alt="Google Play" className={styles.badge} />
          </div>

          {/* Purple Gradient Box with Demo Video */}
          <div className={styles.gradientBox}>
            <video
              className={styles.demoVideo}
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
