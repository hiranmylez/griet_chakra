// src/components/HealthInsights.js
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase"; // Adjust path if needed

const HealthInsights = () => {
  const [insights, setInsights] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    // Sample logic – in future, this could come from Firestore
    const sampleInsights = [
      {
        title: "Hepatitis B Booster",
        message: "Next dose due in 12 days",
        dueDate: "2025-04-16",
      },
      {
        title: "Tetanus Vaccine",
        message: "Annual booster due in 30 days",
        dueDate: "2025-05-05",
      },
    ];

    setInsights(sampleInsights);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🩺 Health Insights & Alerts</h2>
      {insights.map((insight, index) => (
        <div key={index} style={{ marginBottom: "15px", border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
          <h4>{insight.title}</h4>
          <p>{insight.message}</p>
          <small>📅 Due Date: {insight.dueDate}</small>
        </div>
      ))}
    </div>
  );
};

export default HealthInsights;
