import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const EmergencyDataStaff = () => {
  const [emergencyData, setEmergencyData] = useState([]);

  // 🔄 Fetch emergency data shared by all patients
  const fetchEmergencyData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "emergency-data"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEmergencyData(data);
    } catch (error) {
      console.error("Error fetching emergency data:", error);
    }
  };

  useEffect(() => {
    fetchEmergencyData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚨 Emergency Data Shared by Patients</h2>

      {emergencyData.length === 0 ? (
        <p>No emergency data available.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Condition</th>
              <th>Shared Note</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {emergencyData.map((item) => (
              <tr key={item.id}>
                <td>{item.patientName || "Unknown"}</td>
                <td>{item.condition || "N/A"}</td>
                <td>{item.note || "No note"}</td>
                <td>
                  {item.timestamp
                    ? new Date(item.timestamp.seconds * 1000).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmergencyDataStaff;

