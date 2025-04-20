import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../styles/staffLogin.css";

const StaffLogin = () => {
  const [hospitalId, setHospitalId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Step 1: Find staff by hospitalId
      const q = query(
        collection(db, "staffUsers"),
        where("employeeId", "==", hospitalId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid Hospital ID");
        return;
      }

      const staffData = querySnapshot.docs[0].data();
      const email = staffData.officialEmail;

      // Step 2: Use retrieved email to sign in
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/staff-dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid Hospital ID or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Hospital Staff Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Hospital ID</label>
            <input
              type="text"
              placeholder="Enter Hospital ID"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;
