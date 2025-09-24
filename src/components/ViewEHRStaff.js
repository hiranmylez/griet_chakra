// src/components/ViewEHRStaff.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";

const ViewEHRStaff = () => {
  const [patientUID, setPatientUID] = useState("");
  const [file, setFile] = useState(null);
  const [fileDescription, setFileDescription] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  const staffUID = auth.currentUser?.uid;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const checkPermission = async () => {
    if (!staffUID || !patientUID) return;

    try {
      const permissionQuery = query(
        collection(db, "permissionRequests"),
        where("staffUID", "==", staffUID),
        where("patientUID", "==", patientUID),
        where("status", "==", "approved")
      );
      const result = await getDocs(permissionQuery);
      setAccessGranted(!result.empty);
    } catch (error) {
      console.error("Permission check error:", error);
      alert("Error checking permission.");
    }
  };

  const handleUpload = async () => {
    if (!file || !patientUID || !accessGranted) {
      alert("Upload failed. Ensure access is granted and all fields are filled.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/niramaya_backend/php/upload.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.filename) {
        const downloadURL = `http://localhost:8080/niramaya_backend/uploads/${encodeURIComponent(result.filename)}`;

        await addDoc(collection(db, "ehr-records"), {
          uid: patientUID,
          name: result.filename,
          url: downloadURL,
          description: fileDescription,
          timestamp: Timestamp.now(),
        });

        alert("File uploaded successfully!");
        setFile(null);
        setFileDescription("");
        fetchRecords();
      } else {
        alert("Upload failed: " + result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
    }

    setLoading(false);
  };

  const fetchRecords = async () => {
    if (!patientUID || !accessGranted) return;
    const q = query(collection(db, "ehr-records"), where("uid", "==", patientUID));
    const snapshot = await getDocs(q);
    const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setRecords(fetched);
  };

  useEffect(() => {
    if (patientUID) {
      checkPermission();
    }
  }, [patientUID]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👨‍⚕️ Doctor - View/Upload Patient EHR</h2>

      <input
        type="text"
        placeholder="Enter Patient UID"
        value={patientUID}
        onChange={(e) => setPatientUID(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={() => { checkPermission(); fetchRecords(); }}>
        🔍 Fetch Patient Records
      </button>

      <hr />

      {!accessGranted ? (
        <p style={{ color: "red" }}>
          Access not granted by the patient. Request approval before viewing or uploading files.
        </p>
      ) : (
        <>
          <h3>Upload New Record for Patient</h3>
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Enter file description"
            value={fileDescription}
            onChange={(e) => setFileDescription(e.target.value)}
            style={{ width: "100%", marginTop: "10px" }}
          />
          <br />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload Record"}
          </button>

          <hr />

          <h3>📁 Patient's EHR Records</h3>
          <ul>
            {records.map((record) => (
              <li key={record.id}>
                <a
                  href={`http://localhost:8080/niramaya_backend/uploads/${encodeURIComponent(record.name)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {record.name}
                </a>
                {record.description && <span> - {record.description}</span>}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ViewEHRStaff;
