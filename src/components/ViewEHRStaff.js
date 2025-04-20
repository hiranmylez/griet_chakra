
import React, { useState, useEffect } from "react";
import { storage, db } from "../firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp
} from "firebase/firestore";

const ViewEHRStaff = () => {
  const [patientUID, setPatientUID] = useState("");
  const [file, setFile] = useState(null);
  const [fileDescription, setFileDescription] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !patientUID) {
      alert("Please select a file and enter a valid patient UID.");
      return;
    }

    setLoading(true);
    const storageRef = ref(storage, `ehr/${patientUID}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "ehr-records"), {
        uid: patientUID,
        name: file.name,
        url: downloadURL,
        description: fileDescription,
        timestamp: Timestamp.now()
      });

      alert("File uploaded successfully!");
      setFile(null);
      setFileDescription("");
      fetchRecords(); // refresh
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
    }

    setLoading(false);
  };

  const fetchRecords = async () => {
    if (!patientUID) return;
    const q = query(collection(db, "ehr-records"), where("uid", "==", patientUID));
    const snapshot = await getDocs(q);
    const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setRecords(fetched);
  };

  useEffect(() => {
    if (patientUID) fetchRecords();
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

      <button onClick={fetchRecords}>🔍 Fetch Patient Records</button>

      <hr />

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
            <a href={record.url} target="_blank" rel="noreferrer">
              {record.name}
            </a>
            {record.description && <span> - {record.description}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewEHRStaff;


