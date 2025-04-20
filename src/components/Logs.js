import React from "react";

const Logs = () => {
  // Mock log data
  const logData = [
    {
      id: 1,
      action: "Uploaded file",
      details: "blood_report.pdf",
      timestamp: "2025-04-03 10:23 AM",
    },
    {
      id: 2,
      action: "Deleted file",
      details: "xray_2023.jpg",
      timestamp: "2025-04-01 02:15 PM",
    },
    {
      id: 3,
      action: "Granted permission",
      details: "Dr. Smith",
      timestamp: "2025-03-30 06:50 PM",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Activity Logs</h2>
      {logData.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <ul>
          {logData.map((log) => (
            <li key={log.id}>
              <strong>{log.action}</strong> - {log.details} <br />
              <small>{log.timestamp}</small>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Logs;



