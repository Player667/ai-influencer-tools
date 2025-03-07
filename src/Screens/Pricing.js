// src/Screens/Pricing.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import styles from '../Pricing.module.css';

const Pricing = () => {
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please sign in first.");
      navigate("/signin");
      return;
    }

    // Open Stripe link in new tab
    window.open("https://buy.stripe.com/aEUdRlgEPcRA5BC7ss", "_blank");

    // *** Demo Approach *** 
    // Immediately mark user as premium (in real app, do this after payment confirmation)
    // const userDocRef = doc(db, "users", user.uid);
    // await updateDoc(userDocRef, { planStatus: "premium" });

    alert("You are now on the Premium plan! Enjoy unlimited queries.");
    navigate("/dashboard");
  };

  const handleClick = () => {
    // Just navigate to the dashboard or show more details
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
              <li>Limited to 10 free queries / month</li>
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
            <button onClick={handleUpgrade} className={styles.planButton}>
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
            <button onClick={handleUpgrade} className={styles.planButton}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
