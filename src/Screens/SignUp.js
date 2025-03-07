// SignUp.js
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';

// Import the module
import styles from '../SignUp.module.css';

const googleProvider = new GoogleAuthProvider();

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/pricing');
    } catch (error) {
      console.error('Google Sign-In failed:', error.message);
    }
  };

  const handleSignUp = async () => {
    const { email, password, firstName, lastName } = formData;
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      navigate('/pricing');
    } catch (error) {
      console.error('Sign-up failed:', error.message);
      alert(`Sign-up failed: ${error.message}`);
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupCard}>
        <h1 className={styles.signupTitle}>Sign Up</h1>
        <p className={styles.signupSubtitle}>
          Create personalized content in minutes with AI. No credit card required.
        </p>

        {/* First/Last name fields */}
        <div className={styles.nameFields}>
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
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
        <div className={styles.formGroup}>
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
        <div className={styles.formGroup}>
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
        <button className={styles.signupButton} onClick={handleSignUp}>
          Create an account
        </button>

        {/* Google Sign-In Button */}
        <button className={styles.newGoogleButton} onClick={handleGoogleSignIn}>
          <span className={styles.newGoogleIcon}>G</span>
          Sign in with Google
        </button>

        {/* Switch to Sign-In */}
        <p className={styles.switchAuth}>
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>

      {/* Footer */}
      <p className={styles.termsFooter}>
        By creating or entering an account, you agree to the{' '}
        <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default SignUp;
