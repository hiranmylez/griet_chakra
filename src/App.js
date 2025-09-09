// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import NewLandingPage from "./components/NewLandingPage";
import LandingPage from "./components/LandingPage";
import PatientLogin from "./components/PatientLogin";
import StaffLogin from "./components/StaffLogin";
import PatientDashboard from "./components/PatientDashboard";
import StaffDashboard from "./components/StaffDashboard";
import Signup from "./components/Signup";
import ViewEHR from "./components/viewEHR"; // ✅ Correct import
import HealthInsights from "./components/HealthInsights"; // ✅ New page
import HealthDetail from "./components/HealthDetail";     // ✅ Detailed analysis page

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewLandingPage />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/patient-login" element={<PatientLogin />} />
      <Route path="/staff-login" element={<StaffLogin />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/staff-dashboard" element={<StaffDashboard />} />
      <Route path="/dashboard/view-ehr" element={<ViewEHR />} />
      
      {/* New Health Insights Routes */}
      <Route path="/health-insights" element={<HealthInsights />} />
      <Route path="/health-detail" element={<HealthDetail />} />
    </Routes>
  );
}

export default App;
