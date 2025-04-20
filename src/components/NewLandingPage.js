import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/newLanding.css"; 

const NewLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="new-landing-container">
      {/* Header */}
      <header className="header">
        <h2 className="logo">Niramaya</h2>
      
      </header>

      {/* Main Section */}
      <div className="hero-section">
        <h1 className="title">Niramaya</h1>
        <p className="subtitle">Where Modern Healthcare Meets Digital Convenience</p>

        <div className="buttons">
          {/* Corrected navigation to match LandingPage.js */}
          <button onClick={() => navigate("/landingPage")}>Sign In</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default NewLandingPage;

