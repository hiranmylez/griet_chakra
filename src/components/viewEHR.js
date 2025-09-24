// src/components/ViewEHR.js
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase"; // Only auth needed now
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

const ViewEHR = () => {
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileDescription, setFileDescription] = useState("");
  const user = auth.currentUser;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !user) {
      alert("No file selected or user not logged in");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      setLoading(true);
  
      const uploadResponse = await fetch("http://localhost:8080/niramaya_backend/php/upload.php", {
        method: "POST",
        body: formData,
      });
  
      const uploadResult = await uploadResponse.json();
  
      if (uploadResponse.ok && uploadResult.filename) {
        // ✅ Success: store record in Firestore
        await addDoc(collection(db, "ehr-records"), {
          uid: user.uid,
          name: uploadResult.filename,
          description: fileDescription,
          timestamp: Timestamp.now(),
        });
  
        alert("File uploaded successfully!");
        setFile(null);
        setFileDescription("");
        fetchRecords();
      } else {
        alert("Upload failed: " + uploadResult.message || "Unknown error");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };
  

  const fetchRecords = async () => {
    if (!user) return;
    const q = query(collection(db, "ehr-records"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);
    const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setRecords(fetched);
  };

  const handleDelete = async (record) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      // Delete from Firestore (File remains in server unless we build PHP delete separately)
      await deleteDoc(doc(db, "ehr-records", record.id));
      alert("File record deleted.");
      fetchRecords();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete.");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#1e3c72" }}>📁 View & Upload EHR Records</h2>

      <input type="file" onChange={handleFileChange} />
      <br />
      <input
        type="text"
        placeholder="Enter file description"
        value={fileDescription}
        onChange={(e) => setFileDescription(e.target.value)}
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
      />
      <br />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          backgroundColor: "#1e3c72",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      <hr />

      <h3 style={{ color: "#1e3c72" }}>Uploaded Records:</h3>
      <ul>
        {records.map((record) => (
          <li key={record.id} style={{ marginBottom: "10px" }}>
            <a
              href={`http://localhost:8080/niramaya_backend/uploads/${encodeURIComponent(record.name)}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#0044cc", textDecoration: "underline" }}
            >
              {record.name}
            </a>

            {record.description && (
              <span style={{ marginLeft: "10px", color: "gray" }}>
                - {record.description}
              </span>
            )}

            <button
              onClick={() => handleDelete(record)}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "5px 10px",
                marginLeft: "20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewEHR;
