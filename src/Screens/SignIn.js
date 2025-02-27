// src/SignIn.js
import React, { useState } from 'react';
import '../SignIn.css'; 
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';


// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();


const SignIn = () => {
  // State for email, password, and validation
  const navigate = useNavigate(); // Initialize navigation
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: value.trim() === '' });
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In successful:', result.user);
      navigate('/pricing'); // Navigate to Pricing page
    } catch (error) {
      console.error('Google Sign-In failed:', error.message);
      alert(`Google Sign-In failed: ${error.message}`);
    }
  };

  // Handle Email/Password Sign-In
  const handleEmailSignIn = async () => {
    const { email, password } = formData;
    let newErrors = {
      email: !email.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);

    // If any field is empty, stop submission
    if (Object.values(newErrors).some((error) => error)) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email Sign-In successful:', userCredential.user);
      navigate('/pricing'); // Navigate to Pricing page
    } catch (error) {
      console.error('Email Sign-In failed:', error.message);
      alert(`Sign-In failed: ${error.message}`);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h1 className="signin-title">Login</h1>
        <p className="signin-subtitle">
            Create personalized content in minutes with AI. No credit card required.
        </p>

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="shashankp@example.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
            required 
          />
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
            required 
          />
        </div>

        {/* Email/Password Sign-In Button */}
        <button className="signin-button" onClick={handleEmailSignIn}>
          Login
        </button>

        {/* Google Sign-In Button */}
        <button className="new-google-button" onClick={handleGoogleSignIn}>
          <span className="new-google-icon">G</span>
          Sign in with Google
        </button>

        {/* Switch to Sign-Up */}
        <p className="switch-auth">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>

      {/* Footer */}
      <p className="terms-footer">
        By creating or entering an account, you agree to the{" "}
        <a href="/terms">Terms of Service</a> and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default SignIn;
