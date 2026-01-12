import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { BsWindows } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ipoLogo from "../assets/IPOPHL-logo.png";
import "../Css/Register.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign up clicked', { username, password });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.usernameOrEmail.trim() || !form.password.trim()) {
      setError("All fields are required.");
      return;
    }

    navigate("/login");
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="header-section">
          <div className="header-content">
            <img 
                src={ipoLogo} 
                alt="IPOPHL Logo" 
                className="register-logo" 
            />

            <div className="header-text">
              <h1 className="header-title">
                INTELLECTUAL PROPERTY<br />
                OFFICE OF THE PHILIPPINES
              </h1>
              <p className="header-subtitle">Document Management System</p>
            </div>
          </div>
        </div>

        <div className="welcome-section">
          <h2 className="welcome-title">Welcome to IPOPHIL</h2>
          <p className="welcome-subtitle">Create your account</p>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label className="form-label">Username or Email</label>
            <input
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="········"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input password-input"
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="········"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input password-input"
              />
              <span
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            onClick={onSubmit}
            className="signin-button"
          >
            Sign Up
            <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="social-buttons">
            <button
              className="social-button google-login"
              title="Sign in with Google"
            >
              <FcGoogle size={24} />
            </button>

            <button
              className="social-button microsoft-login"
              title="Sign in with Microsoft"
            >
              <BsWindows size={24} color="#0078D4" />
            </button>
          </div>
            <div className="login-row">
                <span>Already have an account?</span>
                <Link to="/login" className="login-link">
                    Sign In
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}