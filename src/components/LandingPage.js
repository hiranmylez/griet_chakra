import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css"; // Import the CSS file

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Header Section */}
      <header className="header">
        <h1 className="logo" onClick={() => navigate("/")}>Niramaya</h1>
      </header>

      {/* Hero Section */}
      <div className="hero">
        <h1 className="title">Niramaya</h1>
        <p className="subtitle">Where Modern Healthcare Meets Digital Convenience</p>
        <div className="buttons">
          <button onClick={() => navigate("/patient-login")}>Sign in as Patient</button>
          <button onClick={() => navigate("/staff-login")}>Sign in as Hospital Staff</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
