import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Login.css";
import ipoLogo from "../assets/IPOPHL-logo.png";

import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsWindows } from "react-icons/bs";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.usernameOrEmail.trim() || !form.password.trim()) {
      setError("Please enter your username/email and password.");
      return;
    }

    // TODO: replace with backend login call
    navigate("/home");
  };

  const signInWithGoogle = () => alert("Google sign-in not yet wired.");
  const signInWithMicrosoft = () => alert("Microsoft sign-in not yet wired.");

  return (
    <div className="login-page">
      <div className="login-card" role="main" aria-label="Login">
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

        <h1 className="login-title">Welcome Back</h1>
        <p className="login-lead">Sign in to continue to your account</p>

        <form className="login-form" onSubmit={onSubmit}>
          {error ? (
            <div className="login-alert" role="alert">
              {error}
            </div>
          ) : null}

          {/* Username / Email */}
          <div className="field">
            <label htmlFor="usernameOrEmail" className="label">
              Username or Email
            </label>

            <div className="input-icon-wrap">
              <MdEmail className="input-icon" size={18} aria-hidden="true" />
              <input
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                className="input input-with-icon"
                placeholder="Username or Email"
                value={form.usernameOrEmail}
                onChange={onChange}
                autoComplete="username"
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
                autoComplete="current-password"
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

          {/* Remember + Forgot */}
          <div className="login-row">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={onChange}
              />
              <span>Keep me signed in</span>
            </label>

            <Link className="forgot" to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          {/* Sign in */}
          <button className="primary-btn" type="submit">
            <span>Sign in</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>

          <div className="divider" aria-hidden="true" />

          {/* Google */}
          <button type="button" className="oauth-btn" onClick={signInWithGoogle}>
            <FcGoogle size={20} aria-hidden="true" />
            <span>Sign in with Google</span>
          </button>

          {/* Microsoft */}
          <button
            type="button"
            className="oauth-btn"
            onClick={signInWithMicrosoft}
          >
            <BsWindows size={18} color="#0078D4" aria-hidden="true" />
            <span>Sign in with Microsoft</span>
          </button>

          {/* Sign up */}
          <div className="signup-row">
            <span>Don’t have an account?</span>
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
