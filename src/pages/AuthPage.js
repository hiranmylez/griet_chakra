import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown, Upload } from 'lucide-react';

const NiramayaAuthSystem = () => {
  const [currentView, setCurrentView] = useState('patientSignup');
  const [userType, setUserType] = useState('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    aadhaarNumber: '',
    phoneNumber: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    relationship: '',
    password: '',
    confirmPassword: '',
    employeeId: '',
    designation: '',
    department: '',
    hospitalName: '',
    email: '',
    loginPhone: '',
    loginEmail: '',
    loginPassword: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const HeartbeatSVG = () => (
    <svg width="300" height="60" viewBox="0 0 300 60" className="opacity-30">
      <path
        d="M0,30 L50,30 L60,10 L70,50 L80,20 L90,40 L100,30 L300,30"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const LeftPanel = ({ title, subtitle }) => (
    <div className="w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 flex flex-col justify-center items-center text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <HeartbeatSVG />
      </div>
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-blue-100">{subtitle}</p>
      </div>
    </div>
  );

  const PatientSignupForm = () => (
    <div className="w-1/2 bg-gray-50 p-12 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign Up</h2>
        
        {/* User Type Toggle */}
        <div className="flex mb-8">
          <button
            onClick={() => setUserType('patient')}
            className={`flex-1 py-3 px-6 rounded-l-lg font-semibold ${
              userType === 'patient'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => {
              setUserType('hospital');
              setCurrentView('hospitalSignup');
            }}
            className={`flex-1 py-3 px-6 rounded-r-lg font-semibold ${
              userType === 'hospital'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Hospital Staff
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="dd-mm-yyyy"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 appearance-none text-gray-500"
              >
                <option value="">Select an option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Aadhaar Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="XXXX XXXX XXXX"
              value={formData.aadhaarNumber}
              onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-20"
            />
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Emergency Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Emergency Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.relationship}
                    onChange={(e) => handleInputChange('relationship', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 appearance-none text-gray-500"
                  >
                    <option value="">Select an option</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="sibling">Sibling</option>
                    <option value="child">Child</option>
                    <option value="friend">Friend</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-semibold transition-colors">
            Create Account
          </button>

          <div className="text-center">
            <p className="text-gray-600 mb-2">Already have an account?</p>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentView('patientLogin')}
                className="text-blue-500 hover:underline"
              >
                Patient Login
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => setCurrentView('hospitalLogin')}
                className="text-blue-500 hover:underline"
              >
                Hospital Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HospitalSignupForm = () => (
    <div className="w-1/2 bg-gray-50 p-12 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign Up</h2>
        
        {/* User Type Toggle */}
        <div className="flex mb-8">
          <button
            onClick={() => {
              setUserType('patient');
              setCurrentView('patientSignup');
            }}
            className={`flex-1 py-3 px-6 rounded-l-lg font-semibold ${
              userType === 'patient'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => setUserType('hospital')}
            className={`flex-1 py-3 px-6 rounded-r-lg font-semibold ${
              userType === 'hospital'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Hospital Staff
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Employee ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => handleInputChange('employeeId', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Designation/Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Doctor, Nurse, Administrator"
              value={formData.designation}
              onChange={(e) => handleInputChange('designation', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Cardiology, Emergency, Radiology"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Hospital Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.hospitalName}
              onChange={(e) => handleInputChange('hospitalName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="name@hospital.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload hospital ID proof <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop your ID</p>
              <p className="text-sm text-gray-400 mb-4">PDF, PNG, JPG up to 10MB</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
                Choose File
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-semibold transition-colors">
            Create Account
          </button>

          <div className="text-center">
            <p className="text-gray-600 mb-2">Already have an account?</p>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentView('patientLogin')}
                className="text-blue-500 hover:underline"
              >
                Patient Login
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => setCurrentView('hospitalLogin')}
                className="text-blue-500 hover:underline"
              >
                Hospital Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PatientLoginForm = () => (
    <div className="w-1/2 bg-gray-50 p-12 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Patient Login</h2>
        <p className="text-gray-600 mb-8">
          Please enter your registered mobile number to<br />
          receive a verification code.
        </p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="+91 XXXXX XXXXX"
              value={formData.loginPhone}
              onChange={(e) => handleInputChange('loginPhone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
            />
          </div>

          <button className="w-full bg-gray-400 text-white py-4 rounded-lg font-semibold">
            Send OTP
          </button>

          <div className="text-center space-y-2">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentView('patientSignup')}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
            <p className="text-gray-600">
              Are you a hospital staff member?{' '}
              <button
                onClick={() => setCurrentView('hospitalLogin')}
                className="text-blue-500 hover:underline"
              >
                Hospital Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const HospitalLoginForm = () => (
    <div className="w-1/2 bg-gray-50 p-12 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Hospital Staff Sign In</h2>
        <p className="text-gray-600 mb-8">Access your healthcare dashboard</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={formData.loginEmail}
              onChange={(e) => handleInputChange('loginEmail', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.loginPassword}
                onChange={(e) => handleInputChange('loginPassword', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-12 text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <button className="text-blue-500 hover:underline">
              Forgot password?
            </button>
          </div>

          <button className="w-full bg-gray-400 text-white py-4 rounded-lg font-semibold">
            Sign In
          </button>

          <div className="text-center space-y-2">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentView('hospitalSignup')}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
            <p className="text-gray-600">
              Are you a patient?{' '}
              <button
                onClick={() => setCurrentView('patientLogin')}
                className="text-blue-500 hover:underline"
              >
                Patient Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'patientSignup':
        return (
          <>
            <LeftPanel 
              title="Join Niramaya" 
              subtitle="Secure, simple access to your health records" 
            />
            <PatientSignupForm />
          </>
        );
      case 'hospitalSignup':
        return (
          <>
            <LeftPanel 
              title="Join Niramaya" 
              subtitle="Secure, simple access to your health records" 
            />
            <HospitalSignupForm />
          </>
        );
      case 'patientLogin':
        return (
          <>
            <LeftPanel 
              title="Welcome Back" 
              subtitle="Access your health dashboard securely" 
            />
            <PatientLoginForm />
          </>
        );
      case 'hospitalLogin':
        return (
          <>
            <LeftPanel 
              title="Welcome Back" 
              subtitle="Access your health dashboard securely" 
            />
            <HospitalLoginForm />
          </>
        );
      default:
        return (
          <>
            <LeftPanel 
              title="Join Niramaya" 
              subtitle="Secure, simple access to your health records" 
            />
            <PatientSignupForm />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex">
      {renderCurrentView()}
    </div>
  );
};

export default NiramayaAuthSystem;
