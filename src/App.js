// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Screens/LandingPage';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import './App.css';
import Pricing from './Screens/Pricing';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page (default) */}
        <Route path="/" element={<LandingPage />} />
        {/* Sign-in page */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  );
}

export default App;
