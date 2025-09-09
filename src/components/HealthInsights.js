// src/components/HealthInsights.js
import React, { useState } from "react";
import HealthGraph from "./HealthGraph";

const HealthInsights = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);

  const insights = [
    {
      metric: "Hemoglobin",
      data: [
        { date: "2025-03-01", value: 12.5 },
        { date: "2025-03-15", value: 13.2 },
        { date: "2025-04-01", value: 12.9 },
      ],
    },
    {
      metric: "Blood Sugar",
      data: [
        { date: "2025-03-01", value: 110 },
        { date: "2025-03-15", value: 125 },
        { date: "2025-04-01", value: 135 },
      ],
    },
  ];

  const generateAnalysis = (data, metric) => {
    if (!data || data.length < 2) return "Not enough data for analysis.";
    const last = data[data.length - 1].value;
    const prev = data[data.length - 2].value;

    if (last > prev) {
      return `⚠️ Your ${metric} levels have increased compared to the previous report. Regular monitoring is advised.`;
    } else if (last < prev) {
      return `✅ Your ${metric} levels have been stable since the last report, showing improvement.`;
    } else {
      return `ℹ️ Your ${metric} levels remain stable over the last two reports.`;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* If no metric selected → show list of insights */}
      {!selectedMetric ? (
        <div>
          <h2>🩺 Health Insights</h2>
          {insights.map((insight, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onClick={() => setSelectedMetric(insight)}
            >
              <h4 style={{ margin: "0 0 8px" }}>{insight.metric}</h4>
              <p style={{ margin: 0, color: "#555" }}>
                Click to view detailed analysis →
              </p>
            </div>
          ))}
        </div>
      ) : (
        // If a metric is selected → show full-frame analysis
        <div style={{ padding: "20px" }}>
          <button
            onClick={() => setSelectedMetric(null)}
            style={{
              marginBottom: "20px",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ⬅ Back
          </button>
          <h2>{selectedMetric.metric} Analysis</h2>
          <p style={{ marginBottom: "20px" }}>
            {generateAnalysis(selectedMetric.data, selectedMetric.metric)}
          </p>
          <HealthGraph
            data={selectedMetric.data}
            metric={selectedMetric.metric}
          />
        </div>
      )}
    </div>
  );
};

export default HealthInsights;
