import React, { useState } from "react";
import "../styles/patientDashboard.css";

import ViewEHR from "./viewEHR";
import GrantPermissions from "./GrantPermissions";
import HealthInsights from "./HealthInsights";
import DownloadInsights from "./DownloadInsights";
import Logs from "./Logs";
import EmergencyDataControl from "./EmergencyDataControl"; // ✅ Import component

const PatientDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("");

  const renderContent = () => {
    switch (selectedTab) {
      case "View EHR":
        return <ViewEHR />;
      case "Grant Permissions":
        return <GrantPermissions />;
      case "Health Insights & Alerts":
        return <HealthInsights />;
      case "Download Insights & Alerts":
        return <DownloadInsights />;
      case "Logs":
        return <Logs />;
      case "Emergency Data Control":
        return <EmergencyDataControl />; // ✅ Render actual component
      default:
        return (
          <div>
            <h2>Welcome to Patient Dashboard</h2>
            <p>Select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar with options */}
      <div className="sidebar">
        <button onClick={() => setSelectedTab("View EHR")}>📁 View EHR</button>
        <button onClick={() => setSelectedTab("Grant Permissions")}>✅ Grant Permissions</button>
        <button onClick={() => setSelectedTab("Health Insights & Alerts")}>🩺 Health Insights & Alerts</button>
        <button onClick={() => setSelectedTab("Download Insights & Alerts")}>📥 Download Insights & Alerts</button>
        <button onClick={() => setSelectedTab("Logs")}>📊 Logs</button>
        <button onClick={() => setSelectedTab("Emergency Data Control")}>🚨 Emergency Data Control</button>
      </div>

      {/* Main Content Area */}
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default PatientDashboard;



