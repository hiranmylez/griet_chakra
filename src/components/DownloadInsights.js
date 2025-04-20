// src/components/DownloadInsights.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { saveAs } from "file-saver";

const DownloadInsights = () => {
  const [records, setRecords] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchRecords = async () => {
      if (!user) return;
      const q = query(collection(db, "ehr-records"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map((doc) => doc.data());
      setRecords(fetched);
    };
    fetchRecords();
  }, [user]);

  const generateCSV = () => {
    const headers = "File Name,Description,Download URL,Uploaded At\n";
    const rows = records.map((r) => {
      const uploadedAt = r.timestamp?.seconds
        ? new Date(r.timestamp.seconds * 1000).toLocaleString()
        : "Unknown";
      return `${r.name},${r.description || ""},${r.url},${uploadedAt}`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "HealthInsights.csv");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📥 Download Health Insights</h2>
      
      <button onClick={generateCSV} disabled={records.length === 0}>
        Download 
      </button>
    </div>
  );
};

export default DownloadInsights;


