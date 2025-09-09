import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/newLanding.css";

const NewLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-cover bg-center new-landing-bg">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
        <header className="absolute top-6 left-6 text-3xl font-semibold"></header>

        {/* Bigger Title */}
        <h1 className="text-7xl font-extrabold mb-5 drop-shadow-xl">Niramaya</h1>

        {/* Bigger Caption */}
        <p className="text-2xl mb-8 max-w-2xl text-center">
          Where Modern Healthcare Meets Digital Convenience
        </p>

        <div className="buttons">
          <button
            onClick={() => navigate("/landingPage")}
            className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg text-white text-lg shadow-md transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white text-lg shadow-md transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewLandingPage;
