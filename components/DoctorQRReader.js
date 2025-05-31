// components/DoctorQRReader.js
// Bu bileşen, doktorun hastadan aldığı QR kodu okumasını ve özet metni ekranda görmesini sağlar.
// Kamera ile QR kod okuma için '@yudiel/react-qr-scanner' kütüphanesini kullanır.

import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function DoctorQRReader() {
  // Okunan QR kodun verisini ve hata durumunu state'te tutuyoruz
  const [qrData, setQrData] = useState("");
  const [error, setError] = useState("");

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Hasta Özeti QR Kod Okuyucu</h2>
      <p>Hastadan aldığınız QR kodu kameraya gösterin.</p>
      <div style={{ maxWidth: 350, margin: "0 auto" }}>
        <Scanner
          onResult={(result) => {
            if (result) {
              setQrData(result);
              setError("");
            }
          }}
          onError={(err) => {
            setError("QR kod okunamadı: " + err.message);
          }}
          video={{ facingMode: "environment" }} // Arka kamera öncelikli
          style={{ width: "100%" }}
        />
      </div>
      {qrData && (
        <div style={{ marginTop: 24 }}>
          <h3>Hasta Sohbet Özeti:</h3>
          <div style={{ background: "#f5f5f5", padding: 16, borderRadius: 8 }}>
            {qrData}
          </div>
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginTop: 16 }}>{error}</div>
      )}
    </div>
  );
} 