import React from "react";
import { useNavigate } from "react-router-dom";
import ipoLogo from "../assets/IPOPHL-logo.png";
import "../Css/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dash-page">
      <header className="dash-topbar">
        <div className="dash-brand">
          <img src={ipoLogo} alt="IPOPHL Logo" className="dash-logo" />
          <div className="dash-brand-text">
            <div className="dash-org">
              INTELLECTUAL PROPERTY
              <br />
              OFFICE OF THE PHILIPPINES
            </div>
          </div>
        </div>

        <div className="dash-actions">
          <button className="dash-ghost" onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
      </header>

      <main className="dash-main">
        {/* HERO */}
        <section className="dash-hero single">
          <div className="dash-hero-left">
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-lead">
              Track your trademark filing progress and manage your documents.
            </p>

            <button className="dash-primary" onClick={() => navigate("/trademark")}>
              File a Trademark <span className="dash-arrow">→</span>
            </button>
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <section className="dash-grid">
          <div className="dash-card">
            <div className="dash-card-top">
              <span className="dash-badge">Drafts</span>
              <span className="dash-metric">2</span>
            </div>
            <div className="dash-card-desc">
              Applications saved but not yet submitted.
            </div>
          </div>

          <div className="dash-card">
            <div className="dash-card-top">
              <span className="dash-badge">Submitted</span>
              <span className="dash-metric">1</span>
            </div>
            <div className="dash-card-desc">Applications successfully filed.</div>
          </div>

          <div className="dash-card">
            <div className="dash-card-top">
              <span className="dash-badge warn">Action Required</span>
              <span className="dash-metric">0</span>
            </div>
            <div className="dash-card-desc">
              Items needing additional documents or updates.
            </div>
          </div>
        </section>

        {/* LOWER PANELS */}
        <section className="dash-lower">
          <div className="dash-panel">
            <div className="dash-panel-title">Recent Activity</div>

            <div className="dash-activity">
              <div className="act-dot" />
              <div className="act-text">
                <div className="act-main">You logged in successfully.</div>
                <div className="act-sub">Today</div>
              </div>
            </div>

            <div className="dash-activity">
              <div className="act-dot" />
              <div className="act-text">
                <div className="act-main">No draft applications yet.</div>
                <div className="act-sub">Tip: Click “File a Trademark” to start.</div>
              </div>
            </div>
          </div>

          <div className="dash-panel">
            <div className="dash-panel-title">Common Actions</div>

            <div className="dash-action-list">
              <button
                className="dash-action-btn"
                onClick={() => navigate("/trademark")}
              >
                Start a new filing <span>→</span>
              </button>

              <button
                className="dash-action-btn"
                onClick={() => alert("Coming soon")}
              >
                View my drafts <span>→</span>
              </button>

              <button
                className="dash-action-btn"
                onClick={() => alert("Coming soon")}
              >
                Check submission status <span>→</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
