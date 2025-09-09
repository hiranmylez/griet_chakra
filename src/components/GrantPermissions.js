// GrantPermissions.js
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

const GrantPermissions = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const user = auth.currentUser;
    try {
      if (!user) return;

      const q = query(
        collection(db, 'permissionRequests'),
        where('patientUID', '==', user.uid)
      );

      const querySnapshot = await getDocs(q);
      const requestList = [];

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        const timestamp = data.timestamp?.toDate().toLocaleString() || "N/A";

        const staffQuery = query(
          collection(db, "staffUsers"),
          where("uid", "==", data.staffUID)
        );
        const staffSnap = await getDocs(staffQuery);

        let staffName = "Unknown";
        if (!staffSnap.empty) {
          staffName = staffSnap.docs[0].data().fullName || "Unknown";
        }

        requestList.push({
          id: docSnap.id,
          ...data,
          timestamp,
          doctorName: staffName,
        });
      }

      setRequests(requestList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching permission requests:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      const requestRef = doc(db, 'permissionRequests', id);
      await updateDoc(requestRef, { status: decision });
      fetchRequests();
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  if (loading) return <p className="text-center">Loading permission requests...</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-left">Access Requests</h2>

      {requests.length === 0 ? (
        <p className="text-left">No permission requests at the moment.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="border border-gray-300 p-4 rounded-md shadow-sm text-left">
              <p><strong>Doctor Name:</strong> {req.doctorName}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Requested At:</strong> {req.timestamp}</p>

              {req.status === 'pending' && (
                <div className="mt-3 flex gap-3">
                  <button
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    onClick={() => handleDecision(req.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDecision(req.id, 'denied')}
                  >
                    Deny
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrantPermissions;
