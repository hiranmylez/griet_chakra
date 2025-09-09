import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-cover bg-center landing-bg">
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white px-4">
        <header
          className="absolute top-6 left-6 text-3xl font-bold cursor-pointer hover:text-teal-300 transition"
          onClick={() => navigate("/")}
        ></header>

        {/* Bigger Title */}
        <h1 className="text-7xl font-extrabold mb-5 drop-shadow-lg">Niramaya</h1>

        {/* Bigger Caption */}
        <p className="text-2xl mb-8 text-center max-w-2xl">
          Where Modern Healthcare Meets Digital Convenience
        </p>

        <div className="buttons">
          <button
            onClick={() => navigate("/patient-login")}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg transition"
          >
            Sign in as Patient
          </button>
          <button
            onClick={() => navigate("/staff-login")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg shadow-lg transition"
          >
            Sign in as Hospital Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
