import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Dashboard from "./Components/Dashboard";
import Trademark from "./Components/Trademark.jsx";

function Home() {
  return <div style={{ padding: 24 }}>Home</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/trademark" element={<Trademark />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
