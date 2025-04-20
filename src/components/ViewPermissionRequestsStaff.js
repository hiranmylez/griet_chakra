import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const ViewPermissionRequestsStaff = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const requestsRef = collection(db, 'permissionRequests');

        const unsubscribe = onSnapshot(requestsRef, (snapshot) => {
            const updatedRequests = [];
            snapshot.forEach((doc) => {
                updatedRequests.push({ id: doc.id, ...doc.data() });
            });
            setRequests(updatedRequests);
            setLoading(false);
            console.log("Staff-side request data updated:", updatedRequests); // Log to see updates
        }, (err) => {
            setError(err);
            setLoading(false);
            console.error("Error fetching requests (staff):", err);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    if (loading) {
        return <p>Loading Permission Requests...</p>;
    }

    if (error) {
        return <p>Error fetching permission requests: {error.message}</p>;
    }

    return (
        <div className="p-6 bg-white rounded shadow max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4">Patient Access Requests</h2>
            {requests.length === 0 ? (
                <p>No permission requests found.</p>
            ) : (
                <ul>
                    {requests.map((req) => (
                        <li key={req.id} className="border p-4 mb-3 rounded">
                            <p><strong>Request ID:</strong> {req.id}</p>
                            <p><strong>Staff UID:</strong> {req.staffUID}</p>
                            <p><strong>Patient Phone:</strong> {req.patientPhone}</p>
                            <p><strong>Status:</strong> {req.status}</p>
                            {/* You can add more details here if needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewPermissionRequestsStaff;