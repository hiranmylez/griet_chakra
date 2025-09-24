// src/components/HealthDetail.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HealthGraph from "./HealthGraph";

const HealthDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { metric, data } = location.state || {};

  // Simple automatic analysis (example)
  const generateAnalysis = () => {
    if (!data || data.length < 2) return "Not enough data for analysis.";

    const last = data[data.length - 1].value;
    const prev = data[data.length - 2].value;

    if (last > prev) {
      return `⚠️ Your ${metric} levels have increased compared to the previous report. Regular monitoring is advised.`;
    } else if (last < prev) {
      return `✅ Your ${metric} levels have decreased since the last report, showing improvement.`;
    } else {
      return `ℹ️ Your ${metric} levels remain stable over the last two reports.`;
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: "20px", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}
      >
        ⬅ Back
      </button>

      <h2>{metric} Analysis</h2>
      <p style={{ fontSize: "16px", marginBottom: "20px" }}>{generateAnalysis()}</p>

      <HealthGraph data={data} metric={metric} />
    </div>
  );
};

export default HealthDetail;
