// ✅ Updated: PatientDashboard.js
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import "../styles/patientDashboard.css";

import ViewEHR from "./viewEHR";
import GrantPermissions from "./GrantPermissions";
import HealthInsights from "./HealthInsights";
import DownloadInsights from "./DownloadInsights";
import Logs from "./Logs";
import EmergencyDataControl from "./EmergencyDataControl";

const PatientDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [fullName, setFullName] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    document.body.style.backgroundColor = "#f0fff0";

    const fetchName = async () => {
      if (user?.uid) {
        const ref = doc(db, "patientUsers", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setFullName(snap.data().fullName);
        }
      }
    };
    fetchName();

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [user]);

  const renderContent = () => {
    switch (selectedTab) {
      case "View EHR": return <ViewEHR />;
      case "Grant Permissions": return <GrantPermissions />;
      case "Health Insights & Alerts": return <HealthInsights />;
      case "Download Insights & Alerts": return <DownloadInsights />;
      case "Logs": return <Logs />;
      case "Emergency Data Control": return <EmergencyDataControl />;
      default:
        return (
          <div className="welcome-block">
            <h2 className="text-2xl font-bold">👤 Welcome, {fullName}</h2>
            <p className="text-sm mt-1 text-gray-600">UID: {user?.uid}</p>
            <p className="mt-4">Select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="patient-dashboard-container">
      <div className="patient-sidebar">
        <button onClick={() => setSelectedTab("View EHR")}>📁 View EHR</button>
        <button onClick={() => setSelectedTab("Grant Permissions")}>✅ Grant Permissions</button>
        <button onClick={() => setSelectedTab("Health Insights & Alerts")}>🩺 Health Insights & Alerts</button>
        <button onClick={() => setSelectedTab("Download Insights & Alerts")}>📥 Download Insights & Alerts</button>
        <button onClick={() => setSelectedTab("Logs")}>📊 Logs</button>
        <button onClick={() => setSelectedTab("Emergency Data Control")}>🚨 Emergency Data Control</button>
      </div>
      <div className="patient-main-content">{renderContent()}</div>
    </div>
  );
};

export default PatientDashboard;
