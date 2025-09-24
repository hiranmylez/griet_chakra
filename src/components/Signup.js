import { useState } from "react";
import "./../styles/signup.css";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("patient");

    const [formData, setFormData] = useState({
        fullName: "",
        dob: "",
        gender: "",
        aadhar: "",
        phone: "",
        email: "",
        address: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelation: "",
        password: "",
        confirmPassword: "",
        employeeId: "",
        designation: "",
        department: "",
        hospitalName: "",
        hospitalRegNo: "",
        officialEmail: "",
        hospitalPhone: "",
        verificationDoc: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (userType === "staff") {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.officialEmail,
                    formData.password
                );

                const user = userCredential.user;

                await addDoc(collection(db, "staffUsers"), {
                    uid: user.uid,
                    fullName: formData.fullName,
                    employeeId: formData.employeeId,
                    designation: formData.designation,
                    department: formData.department,
                    hospitalName: formData.hospitalName,
                    hospitalRegNo: formData.hospitalRegNo,
                    officialEmail: formData.officialEmail,
                    hospitalPhone: formData.hospitalPhone,
                    timestamp: new Date()
                });

                alert("Staff registration successful!");
                // navigate("/staff-dashboard");
            } catch (error) {
                console.error("Error during staff signup:", error);
                alert("Staff registration failed: " + error.message);
            }
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );

                const user = userCredential.user;

                await addDoc(collection(db, "patientUsers"), {
                    uid: user.uid,
                    fullName: formData.fullName,
                    dob: formData.dob,
                    gender: formData.gender,
                    aadhar: formData.aadhar,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.address,
                    emergencyContactName: formData.emergencyContactName,
                    emergencyContactPhone: formData.emergencyContactPhone,
                    emergencyContactRelation: formData.emergencyContactRelation,
                    timestamp: new Date()
                });

                alert("Patient registration successful!");
                // navigate("/patient-dashboard");
            } catch (error) {
                console.error("Error during patient signup:", error);
                alert("Patient registration failed: " + error.message);
            }
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <div className="user-type-selector">
                    <button className={userType === "patient" ? "active" : ""} onClick={() => setUserType("patient")}>
                        Patient
                    </button>
                    <button className={userType === "staff" ? "active" : ""} onClick={() => setUserType("staff")}>
                        Hospital Staff
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {userType === "patient" ? (
                        <>
                            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                            <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />
                            <select name="gender" onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <input type="text" name="aadhar" placeholder="Aadhar Number" onChange={handleChange} required />
                            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Email (Optional)" onChange={handleChange} />
                            <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                            <input type="text" name="emergencyContactName" placeholder="Emergency Contact Name" onChange={handleChange} required />
                            <input type="text" name="emergencyContactPhone" placeholder="Emergency Contact Phone" onChange={handleChange} required />
                            <input type="text" name="emergencyContactRelation" placeholder="Relationship" onChange={handleChange} required />
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                        </>
                    ) : (
                        <>
                            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                            <input type="text" name="employeeId" placeholder="Employee ID" onChange={handleChange} required />
                            <input type="text" name="designation" placeholder="Designation/Role" onChange={handleChange} required />
                            <input type="text" name="department" placeholder="Department (e.g., Cardiology)" onChange={handleChange} required />
                            <input type="text" name="hospitalName" placeholder="Hospital Name" onChange={handleChange} required />
                            <input type="text" name="hospitalRegNo" placeholder="Hospital Registration Number" onChange={handleChange} required />
                            <input type="email" name="officialEmail" placeholder="Official Email" onChange={handleChange} required />
                            <input type="text" name="hospitalPhone" placeholder="Phone Number" onChange={handleChange} required />
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                            <label>Upload Verification Document:</label>
                            <input type="file" name="verificationDoc" onChange={handleChange} required />
                        </>
                    )}

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
