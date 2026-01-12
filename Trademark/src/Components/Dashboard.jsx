import React from "react";
import { useNavigate } from "react-router-dom";
import ipoLogo from "../assets/IPOPHL-logo.png";
import "../Css/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <img src={ipoLogo} alt="IPOPHL Logo" className="dashboard-logo" />
          <div className="dashboard-title">
            <strong>INTELLECTUAL PROPERTY</strong>
            <span>OFFICE OF THE PHILIPPINES</span>
            <small>Document Management System</small>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <h1>Welcome</h1>
        <p>What would you like to do today?</p>

        <button
          className="file-trademark-btn"
          onClick={() => navigate("/file-trademark")}
        >
          File a Trademark
        </button>
      </main>
    </div>
  );
}
