import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const DownloadReports = () => {
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [filesByPatient, setFilesByPatient] = useState({});

  const doctor = auth.currentUser;

  // Fetch approved patients
  const fetchApprovedPatients = async () => {
    if (!doctor) return;

    const q = query(
      collection(db, "permission-requests"),
      where("doctorId", "==", doctor.uid),
      where("status", "==", "Approved")
    );

    const snapshot = await getDocs(q);
    const patients = snapshot.docs.map((doc) => ({
      id: doc.data().patientId,
      name: doc.data().patientName || "Unnamed",
    }));
    setApprovedPatients(patients);
  };

  // Fetch files for each approved patient
  const fetchPatientFiles = async () => {
    const result = {};

    for (let patient of approvedPatients) {
      const ehrRef = collection(db, "users", patient.id, "ehr");
      const ehrSnapshot = await getDocs(ehrRef);
      result[patient.id] = [];

      for (let docSnap of ehrSnapshot.docs) {
        const data = docSnap.data();
        const fileRef = ref(storage, data.filePath); // filePath should be saved in ehr doc
        const url = await getDownloadURL(fileRef);

        result[patient.id].push({
          name: data.name || "Unnamed Report",
          url,
          uploadedAt: data.uploadedAt?.toDate().toLocaleString() || "Unknown",
        });
      }
    }

    setFilesByPatient(result);
  };

  useEffect(() => {
    fetchApprovedPatients();
  }, [doctor]);

  useEffect(() => {
    if (approvedPatients.length > 0) {
      fetchPatientFiles();
    }
  }, [approvedPatients]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📥 Download Approved Patient Reports</h2>
      {approvedPatients.length === 0 ? (
        <p>No approved patients found.</p>
      ) : (
        approvedPatients.map((patient) => (
          <div key={patient.id} style={{ marginBottom: "20px" }}>
            <h3>👤 {patient.name}</h3>
            {filesByPatient[patient.id]?.length > 0 ? (
              <ul>
                {filesByPatient[patient.id].map((file, idx) => (
                  <li key={idx}>
                    📄 {file.name} <br />
                    🕒 {file.uploadedAt} <br />
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      🔽 Download
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No EHR files available.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DownloadReports;
