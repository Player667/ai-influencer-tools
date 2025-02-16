import React from 'react';
import './SignUp.css'; // <-- make sure to create SignUp.css (see below)

function SignUp() {
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">Sign Up</h1>
        <p className="signup-subtitle">
          Create notes in minutes. Free forever. No credit card required.
        </p>

        {/* Continue with Google button */}
        <button className="google-button">
          {/* Ideally use an actual Google icon; a placeholder text here */}
          <span className="google-icon">G</span>
          Continue with Google
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* First/Last name fields side-by-side */}
        <div className="name-fields">
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Sarthak"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Dhawan"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="sarthak@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder=""
          />
        </div>

        <button className="signup-button">Create an account</button>

        <p className="switch-auth">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>

      <p className="terms-footer">
        By creating or entering an account, you agree to the{" "}
        <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
      </p>
    </div>
  );
}

export default SignUp;
