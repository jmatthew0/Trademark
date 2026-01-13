import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Register.css";
import ipoLogo from "../assets/IPOPHL-logo.png";

import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsWindows } from "react-icons/bs";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: replace with backend registration call
    navigate("/login");
  };

  const signUpWithGoogle = () => alert("Google sign-up not yet wired.");
  const signUpWithMicrosoft = () => alert("Microsoft sign-up not yet wired.");

  return (
    <div className="login-page">
      <div className="login-card" role="main" aria-label="Sign up">
        <header className="login-header">
          <img className="login-logo" src={ipoLogo} alt="IPOPHL logo" />
          <div className="login-header-text">
            <div className="login-org">
              INTELLECTUAL PROPERTY
              <br />
              OFFICE OF THE PHILIPPINES
            </div>
            <div className="login-subtitle">Document Management System</div>
          </div>
        </header>

        <h1 className="login-title">Create Account</h1>
        <p className="login-lead">Sign up to get started</p>

        <form className="login-form" onSubmit={onSubmit}>
          {error ? (
            <div className="login-alert" role="alert">
              {error}
            </div>
          ) : null}

          {/* Email */}
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>

            <div className="input-icon-wrap">
              <MdEmail className="input-icon" size={18} aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                className="input input-with-icon"
                placeholder="Email address"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>

            <div className="password-wrap">
              <FaLock className="input-icon left" size={16} aria-hidden="true" />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="input input-with-left-icon"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((s) => !s)}
                aria-label="Toggle password visibility"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="field">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>

            <div className="password-wrap">
              <FaLock className="input-icon left" size={16} aria-hidden="true" />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="input input-with-left-icon"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={onChange}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirmPassword((s) => !s)}
                aria-label="Toggle confirm password visibility"
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* Sign up */}
          <button className="primary-btn" type="submit">
            <span>Sign up</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>

          <div className="divider" aria-hidden="true" />

          {/* Google */}
          <button type="button" className="oauth-btn" onClick={signUpWithGoogle}>
            <FcGoogle size={20} aria-hidden="true" />
            <span>Sign up with Google</span>
          </button>

          {/* Microsoft */}
          <button
            type="button"
            className="oauth-btn"
            onClick={signUpWithMicrosoft}
          >
            <BsWindows size={18} color="#0078D4" aria-hidden="true" />
            <span>Sign up with Microsoft</span>
          </button>

          {/* Sign in */}
          <div className="signup-row">
            <span>Already have an account?</span>
            <Link to="/login" className="signup-link">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}