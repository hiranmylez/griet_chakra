// ✅ UPDATED: RequestPermissions.js
import React, { useState } from "react";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

const RequestPermissions = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [description, setDescription] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const searchPatientByPhone = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "patientUsers"),
        where("phone", "==", searchNumber.trim())
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setPatientData({ ...doc.data(), id: doc.id, uid: doc.data().uid });
        setRequestStatus("");
      } else {
        setPatientData(null);
        setRequestStatus("Patient not found");
      }
    } catch (error) {
      console.error("Error searching patient:", error);
      setRequestStatus("Error during search");
    } finally {
      setLoading(false);
    }
  };

  const sendPermissionRequest = async () => {
    if (!patientData || !description.trim()) {
      alert("Please enter a valid description.");
      return;
    }
    try {
      const staffUID = auth.currentUser?.uid;
      const staffSnap = await getDoc(doc(db, "staffUsers", staffUID));
      const staffName = staffSnap.exists() ? staffSnap.data().fullName : "Unknown";

      await addDoc(collection(db, "permissionRequests"), {
        staffUID,
        staffName,
        patientUID: patientData.uid,
        patientPhone: patientData.phone,
        description,
        status: "pending",
        timestamp: serverTimestamp(),
      });

      setRequestStatus("Permission request sent!");
      setDescription("");
    } catch (error) {
      console.error("Error sending permission request:", error);
      setRequestStatus("Failed to send request");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-xl font-bold mb-4">Request Patient Access</h2>
      <input
        type="text"
        placeholder="Enter Patient Phone Number"
        value={searchNumber}
        onChange={(e) => setSearchNumber(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />
      <button
        onClick={searchPatientByPhone}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search Patient"}
      </button>

      {patientData && (
        <div className="border-t pt-4 mt-4">
          <p><strong>Name:</strong> {patientData.fullName}</p>
          <p><strong>Phone:</strong> {patientData.phone}</p>
          <p><strong>Email:</strong> {patientData.email}</p>
          <p><strong>UID:</strong> {patientData.uid}</p>

          <textarea
            placeholder="Why do you need access?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full mt-3 mb-3"
            rows={3}
          />

          <button
            onClick={sendPermissionRequest}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
          >
            Send Request
          </button>
        </div>
      )}

      {requestStatus && (
        <p className="text-red-500 mt-4 font-medium">{requestStatus}</p>
      )}
    </div>
  );
};

export default RequestPermissions;
