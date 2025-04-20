import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import "../styles/patientLogin.css";

const PatientLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize reCAPTCHA verifier only once
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA verified");
        },
      });
    }
  }, []);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    const fullPhone = "+91" + phoneNumber;
    setSending(true);

    try {
      // Reset the appVerifier if already rendered
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA verified");
      },
      });

      const appVerifier = window.recaptchaVerifier;

      const confirmation = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      window.confirmationResult = confirmation;
      setOtpSent(true);
      alert("OTP has been sent successfully!");
    } catch (error) {
      console.error("OTP sending error:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {
      await window.confirmationResult.confirm(otp);
      navigate("/patient-dashboard");
    } catch (error) {
      alert("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Patient Login</h2>

        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {otpSent && (
          <div className="input-group">
            <label>OTP</label>
            <input
              type="password"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {!otpSent ? (
          <button
            className="login-button"
            onClick={handleSendOtp}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send OTP"}
          </button>
        ) : (
          <button className="login-button" onClick={handleVerifyOtp}>
            Login
          </button>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default PatientLogin;
