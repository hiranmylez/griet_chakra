import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const ViewPermissionRequestsStaff = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError({ message: "Not logged in." });
      setLoading(false);
      return;
    }

    const staffUID = user.uid;
    const q = query(
      collection(db, 'permissionRequests'),
      where('staffUID', '==', staffUID)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const updated = [];
        snapshot.forEach((doc) => {
          updated.push({ id: doc.id, ...doc.data() });
        });

        updated.sort((a, b) => {
          const timeA = a.timestamp?.toMillis?.() || 0;
          const timeB = b.timestamp?.toMillis?.() || 0;
          return timeB - timeA;
        });

        setRequests(updated);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching staff permission requests:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center">Loading Permission Requests...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-left">Your Permission Requests</h2>
      {requests.length === 0 ? (
        <p className="text-left">No permission requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => {
            const date = req.timestamp?.toDate?.().toLocaleString('en-GB') || 'N/A';
            return (
              <div key={req.id} className="border border-gray-300 p-4 rounded-md shadow-sm text-left">
                <p><strong>Request ID:</strong> {req.id}</p>
                <p><strong>Patient Phone:</strong> {req.patientPhone || 'N/A'}</p>
                <p><strong>Status:</strong> {req.status}</p>
                <p><strong>Requested At:</strong> {date}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewPermissionRequestsStaff;
