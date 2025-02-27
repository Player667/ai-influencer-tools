import React from 'react';
import '../Pricing.css'; // Make sure the path is correct

const Pricing = () => {
  return (
    <div className="pricing-page">
      <h1 className="pricing-title">Choose Your Plan</h1>
      <p className="pricing-subtitle">
        Unlock the power of AI-driven content creation. Cancel anytime.
      </p>

      <div className="pricing-cards-container">
        
        {/* Basic Plan */}
        <div className="pricing-card">
          <div className="card-content">
            <h2 className="plan-name">Basic</h2>
            <p className="plan-price">
              $0 <span className="plan-cycle">/ month</span>
            </p>
            <ul className="plan-features">
              <li>Flux Infill Generation</li>
              <li>AI Voice Messaging (Standard)</li>
              <li>Basic Content Generation Tools</li>
              <li>Very Limited Content Generation / Month</li>
            </ul>
            <button className="plan-button">Get Started</button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="pricing-card">
          <div className="card-content">
            <h2 className="plan-name">Pro</h2>
            <p className="plan-price">
              $19 <span className="plan-cycle">/ month</span>
            </p>
            <ul className="plan-features">
              <li>All Basic Features Included</li>
              <li>Advanced Flux Infill Generation</li>
              <li>AI Voice Messaging with Lip Sync</li>
              <li>Unlimited Content Generation</li>
              <li>Priority Support</li>
            </ul>
            <button className="plan-button">Go Pro</button>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="pricing-card">
          <div className="card-content">
            <h2 className="plan-name">Enterprise</h2>
            <p className="plan-price">
              $49 <span className="plan-cycle">/ month</span>
            </p>
            <ul className="plan-features">
              <li>All Pro Features Included</li>
              <li>Custom AI Voice Models</li>
              <li>White-Label Tools</li>
              <li>Dedicated 24/7 Support</li>
              <li>Team Collaboration Tools</li>
            </ul>
            <button className="plan-button">Contact Us</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Pricing;
