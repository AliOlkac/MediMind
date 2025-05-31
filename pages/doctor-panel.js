// pages/doctor-panel.js
// Bu sayfa, doktorun QR kodu okutup hasta özetini görebileceği paneldir.

import React from "react";
import DoctorQRReader from "../components/DoctorQRReader";

export default function DoctorPanel() {
  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee" }}>
      <h1 style={{ textAlign: "center" }}>Doktor Paneli</h1>
      {/* QR kod okuma bileşenini burada kullanıyoruz */}
      <DoctorQRReader />
    </div>
  );
} 