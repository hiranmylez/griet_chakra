// src/components/viewEHR.js
import React, { useState, useEffect } from "react";
import { storage, db, auth } from "../firebase/firebase"; // ✅ Correct path
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp
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
      alert("No file selected");
      return;
    }
    setLoading(true);
    const storageRef = ref(storage, `ehr/${user.uid}/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "ehr-records"), {
        uid: user.uid,
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
    if (!user) return;
    const q = query(collection(db, "ehr-records"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);
    const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setRecords(fetched);
  };

  const handleDelete = async (record) => {
    const fileRef = ref(storage, `ehr/${user.uid}/${record.name}`);
    try {
      await deleteObject(fileRef);
      await deleteDoc(doc(db, "ehr-records", record.id));
      alert("File deleted.");
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
      <h2>📁 View & Upload EHR Records</h2>
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
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      <hr />
      <h3>Uploaded Records:</h3>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            <a href={record.url} target="_blank" rel="noreferrer">
              {record.name}
            </a>
            {record.description && <span> - {record.description}</span>}
            <button onClick={() => handleDelete(record)} style={{ marginLeft: "10px" }}>
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewEHR;
