// src/SignIn.js
import React from 'react';
import App from '../App'; 
function SignIn() {
  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form className="signin-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Sign Up here</a>.
      </p>
    </div>
  );
}

export default SignIn;
