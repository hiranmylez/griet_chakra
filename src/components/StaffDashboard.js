import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import "../styles/staffDashboard.css";
import { collection, query, where, getDocs } from "firebase/firestore";


import {
  doc,
  getDoc
} from "firebase/firestore";

import ViewEHRStaff from "../components/ViewEHRStaff";
import RequestPermissions from "../components/RequestPermissions";
import EmergencyDataStaff from "../components/EmergencyDataStaff";
import ViewPermissionRequestsStaff from "../components/ViewPermissionRequestsStaff";

const StaffDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [staffName, setStaffName] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    document.body.style.backgroundColor = "#e0f7fa"; // Light blue for staff
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const fetchStaffName = async () => {
      if (!user?.uid) return;
      try {
        const q = query(
          collection(db, "staffUsers"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setStaffName(data.fullName || "Staff");
        } else {
          console.warn("Staff document not found for UID:", user.uid);
        }
      } catch (error) {
        console.error("Error fetching staff name:", error);
      }
    };
  
    fetchStaffName();
  }, [user]);
  

  const renderContent = () => {
    switch (selectedTab) {
      case "View/Update EHR":
        return <ViewEHRStaff />;
      case "Request More Permission":
        return <RequestPermissions />;
      case "Download Reports":
        return <p>📥 Download Reports feature coming soon!</p>;
      case "Emergency Data Control":
        return <EmergencyDataStaff />;
      case "View Permission Requests":
        return <ViewPermissionRequestsStaff />;
      default:
        return (
          <div>
            <div style={{ fontSize: "40px", textAlign: "center" }}>👤</div>
            <h2 className="text-center text-2xl mt-2 font-semibold">Welcome, {staffName || "Staff"}</h2>
            <p className="text-center text-sm mt-1 text-gray-600">
              UID: <span className="text-blue-700">{user?.uid}</span>
            </p>
            <p className="text-center mt-4">Select a feature from the sidebar to begin.</p>
          </div>
        );
    }
  };

  return (
    <div className="staff-dashboard-container">
      <div className="staff-sidebar">
        <button onClick={() => setSelectedTab("View/Update EHR")}>📁 View/Update EHR</button>
        <button onClick={() => setSelectedTab("Download Reports")}>📥 Download Reports</button>
        <button onClick={() => setSelectedTab("Request More Permission")}>🔐 Request More Permission</button>
        <button onClick={() => setSelectedTab("Emergency Data Control")}>🚨 Emergency Data Control</button>
        <button onClick={() => setSelectedTab("View Permission Requests")}>📜 View Permission Requests</button>
      </div>

      <div className="staff-main-content">{renderContent()}</div>
    </div>
  );
};

export default StaffDashboard;
