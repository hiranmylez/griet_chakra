import React, { useState } from "react";
import "../styles/staffDashboard.css";

// ✅ Component imports
import ViewEHRStaff from "../components/ViewEHRStaff";
import RequestPermissions from "../components/RequestPermissions";
import EmergencyDataStaff from "../components/EmergencyDataStaff";
import ViewPermissionRequestsStaff from "../components/ViewPermissionRequestsStaff"; // Import the new component
// Uncomment and use once ready:
// import DownloadReports from "../components/DownloadReports";

const StaffDashboard = () => {
    const [selectedTab, setSelectedTab] = useState("");

    const renderContent = () => {
        switch (selectedTab) {
            case "View/Update EHR":
                return <ViewEHRStaff />;
            case "Request More Permission":
                return <RequestPermissions />;
            case "Download Reports":
                return <p>📥 Download Reports feature coming soon!</p>;
                // return <DownloadReports />;
            case "Emergency Data Control":
                return <EmergencyDataStaff />;
            case "View Permission Requests": // New tab
                return <ViewPermissionRequestsStaff />;
            default:
                return (
                    <div>
                        <h2>👨‍⚕️ Welcome to Staff Dashboard</h2>
                        <p>Select a feature from the sidebar to begin.</p>
                    </div>
                );
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar Navigation */}
            <div className="sidebar">
                <button onClick={() => setSelectedTab("View/Update EHR")}>
                    📁 View/Update EHR
                </button>
                <button onClick={() => setSelectedTab("Download Reports")}>
                    📥 Download Reports
                </button>
                <button onClick={() => setSelectedTab("Request More Permission")}>
                    🔐 Request More Permission
                </button>
                <button onClick={() => setSelectedTab("Emergency Data Control")}>
                    🚨 Emergency Data Control
                </button>
                <button onClick={() => setSelectedTab("View Permission Requests")}> {/* New button */}
                    📜 View Permission Requests
                </button>
            </div>

            {/* Main Dynamic Content */}
            <div className="main-content">{renderContent()}</div>
        </div>
    );
};

export default StaffDashboard;



