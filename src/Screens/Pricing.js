import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Pricing.module.css';

const Pricing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className={styles.pricingPage}>
      <h1 className={styles.pricingTitle}>Choose Your Plan</h1>
      <p className={styles.pricingSubtitle}>
        Unlock the power of AI-driven content creation. Cancel anytime.
      </p>

      <div className={styles.pricingCardsContainer}>
        {/* Basic Plan */}
        <div className={styles.pricingCard}>
          <div className={styles.cardContent}>
            <h2 className={styles.planName}>Basic</h2>
            <p className={styles.planPrice}>
              $0 <span className={styles.planCycle}>/ month</span>
            </p>
            <ul className={styles.planFeatures}>
              <li>Flux Infill Generation</li>
              <li>AI Voice Messaging (Standard)</li>
              <li>Basic Content Generation Tools</li>
              <li>Very Limited Content Generation / Month</li>
            </ul>
            <button onClick={handleClick} className={styles.planButton}>
              Get Started
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className={styles.pricingCard}>
          <div className={styles.cardContent}>
            <h2 className={styles.planName}>Pro</h2>
            <p className={styles.planPrice}>
              $19 <span className={styles.planCycle}>/ month</span>
            </p>
            <ul className={styles.planFeatures}>
              <li>All Basic Features Included</li>
              <li>Advanced Flux Infill Generation</li>
              <li>AI Voice Messaging with Lip Sync</li>
              <li>Unlimited Content Generation</li>
              <li>Priority Support</li>
            </ul>
            <button onClick={handleClick} className={styles.planButton}>
              Go Pro
            </button>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className={styles.pricingCard}>
          <div className={styles.cardContent}>
            <h2 className={styles.planName}>Enterprise</h2>
            <p className={styles.planPrice}>
              $49 <span className={styles.planCycle}>/ month</span>
            </p>
            <ul className={styles.planFeatures}>
              <li>All Pro Features Included</li>
              <li>Custom AI Voice Models</li>
              <li>White-Label Tools</li>
              <li>Dedicated 24/7 Support</li>
              <li>Team Collaboration Tools</li>
            </ul>
            <button onClick={handleClick} className={styles.planButton}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
