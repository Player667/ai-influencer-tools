// src/Screens/SignIn.js
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import styles from '../SignIn.module.css';

const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: value.trim() === '' }));
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // If user doc doesn't exist, create it (merging so we don't overwrite)
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          planStatus: 'free',
          freeQueriesUsed: 0,
          email: user.email,
          displayName: user.displayName,
        });
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Google Sign-In failed:', error.message);
      alert(`Google Sign-In failed: ${error.message}`);
    }
  };

  const handleEmailSignIn = async () => {
    const { email, password } = formData;
    let newErrors = {
      email: !email.trim(),
      password: !password.trim(),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // (Optional) Fetch user doc to confirm planStatus or usage
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        // If user doc not found, create it with default fields
        await setDoc(userDocRef, {
          planStatus: 'free',
          freeQueriesUsed: 0,
          email: user.email,
        });
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Email Sign-In failed:', error.message);
      alert(`Sign-In failed: ${error.message}`);
    }
  };

  return (
    <div className={styles.signinPage}>
      <div className={styles.signinCard}>
        <h1 className={styles.signinTitle}>Login</h1>
        <p className={styles.signinSubtitle}>
          Create personalized content in minutes with AI. No credit card required.
        </p>

        {/* Email Input */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.inputError : ''}
            required
          />
        </div>

        {/* Password Input */}
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? styles.inputError : ''}
            required
          />
        </div>

        {/* Email/Password Sign-In Button */}
        <button className={styles.signinButton} onClick={handleEmailSignIn}>
          Login
        </button>

        {/* Google Sign-In Button */}
        <button className={styles.newGoogleButton} onClick={handleGoogleSignIn}>
          <span className={styles.newGoogleIcon}>G</span>
          Sign in with Google
        </button>

        {/* Switch to Sign-Up */}
        <p className={styles.switchAuth}>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>

      {/* Footer */}
      <p className={styles.termsFooter}>
        By creating or entering an account, you agree to the{' '}
        <a href="/terms">Terms of Service</a> and{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default SignIn;
