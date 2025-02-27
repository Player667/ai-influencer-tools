// src/Screens/SignUp.js
import React, { useState } from 'react';
import '../SignUp.css';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';


// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

const SignUp = () => {
  // State for form data
  const navigate = useNavigate(); // Initialize navigation
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate('/pricing'); // Navigate to Pricing page
    } catch (error) {
      console.error('Google Sign-In failed:', error.message);
    }
  };

  // Handle Email/Password Sign-Up
  const handleSignUp = async () => {
    const { email, password, firstName, lastName } = formData;
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      
      console.log('User signed up successfully:', user);
      navigate('/pricing'); // Navigate to Pricing page
    } catch (error) {
      console.error('Sign-up failed:', error.message);
      alert(`Sign-up failed: ${error.message}`);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">Sign Up</h1>
        <p className="signup-subtitle">
            Create personalized content in minutes with AI. No credit card required.
        </p>

        {/* First/Last name fields */}
        <div className="name-fields">
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Shashank"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Polanki"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="shashankp@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Create Account Button */}
        <button className="signup-button" onClick={handleSignUp}>
          Create an account
        </button>

        {/* Google Sign-In Button */}
        <button className="new-google-button" onClick={handleGoogleSignIn}>
          <span className="new-google-icon">G</span>
          Sign in with Google
        </button>

        {/* Switch to Sign-In */}
        <p className="switch-auth">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>

      {/* Footer */}
      <p className="terms-footer">
        By creating or entering an account, you agree to the{" "}
        <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
      </p>
    </div>
  );
};

// Correctly place export statement here
export default SignUp;
