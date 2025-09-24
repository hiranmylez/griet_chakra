import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

const EmergencyDataControl = () => {
  const user = auth.currentUser;
  const [records, setRecords] = useState([]);

  const fetchEHRs = async () => {
    if (!user) return;

    const q = query(
      collection(db, "ehr-records"),
      where("uid", "==", user.uid)
    );
    const snapshot = await getDocs(q);
    const fetched = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      emergencyAllowed: doc.data().emergencyAllowed || false
    }));
    setRecords(fetched);
  };

  const toggleEmergencyAccess = async (record) => {
    const ref = doc(db, "ehr-records", record.id);
    await updateDoc(ref, {
      emergencyAllowed: !record.emergencyAllowed
    });
    fetchEHRs(); // Refresh
  };

  useEffect(() => {
    fetchEHRs();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚨 Emergency Data Control</h2>
      <p>Select which EHR files can be accessed during emergencies:</p>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            <a href={record.url} target="_blank" rel="noreferrer">
              {record.name}
            </a>{" "}
            | Emergency Access:{" "}
            <strong>{record.emergencyAllowed ? "✅ Allowed" : "❌ Not Allowed"}</strong>
            <button
              onClick={() => toggleEmergencyAccess(record)}
              style={{ marginLeft: "10px" }}
            >
              {record.emergencyAllowed ? "Revoke" : "Allow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyDataControl;


