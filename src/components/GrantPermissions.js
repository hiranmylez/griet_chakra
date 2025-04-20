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
        console.log("fetchRequests function started"); // ADDED LOG
        const user = auth.currentUser;
        console.log("Current User UID:", user?.uid); // ADDED LOG - CHECK THIS IN CONSOLE
        try {
            if (!user) {
                console.log("User not logged in, fetchRequests aborted."); // ADDED LOG
                return;
            }

            const userRef = doc(db, 'patientUsers', user.uid);
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
                console.log("Patient data not found, fetchRequests aborted."); // ADDED LOG
                return;
            }

            const patientPhone = userSnap.data().phone;
            console.log("Logged-in patient's phone:", patientPhone); // YOUR EXISTING LOG

            const q = query(
                collection(db, 'permissionRequests'),
                where('patientPhone', '==', patientPhone)
            );

            const querySnapshot = await getDocs(q);
            const requestList = [];

            querySnapshot.forEach((docSnap) => {
                requestList.push({ id: docSnap.id, ...docSnap.data() });
            });

            setRequests(requestList);
            setLoading(false);
            console.log("fetchRequests function completed successfully"); // ADDED LOG
        } catch (error) {
            console.error('Error fetching permission requests:', error);
            setLoading(false);
            console.log("fetchRequests function encountered an error"); // ADDED LOG
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleDecision = async (id, decision) => {
        try {
            const requestRef = doc(db, 'permissionRequests', id);
            await updateDoc(requestRef, { status: decision });
            fetchRequests(); // Refresh the list after approval/denial
        } catch (error) {
            console.error('Error updating request:', error);
        }
    };

    if (loading) return <p>Loading permission requests...</p>;

    return (
        <div className="p-6 bg-white rounded shadow max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4">Access Requests</h2>

            {requests.length === 0 ? (
                <p>No permission requests at the moment.</p>
            ) : (
                <ul>
                    {requests.map((req) => (
                        <li key={req.id} className="border p-4 mb-3 rounded">
                            <p><strong>Staff UID:</strong> {req.staffUID}</p>
                            <p><strong>Status:</strong> {req.status}</p>
                            {req.status === 'pending' && (
                                <div className="mt-2">
                                    <button
                                        className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => handleDecision(req.id, 'approved')}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => handleDecision(req.id, 'denied')}
                                    >
                                        Deny
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GrantPermissions;