// components/DoctorQRReader.js
// Bu bileşen, doktorun hastadan aldığı QR kodu okumasını ve özet metni ekranda görmesini sağlar.
// Webcam ile QR kod okuma için '@blackbox-vision/react-qr-reader' kütüphanesini kullanır.

import React, { useState } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";

export default function DoctorQRReader() {
  // Okunan QR kodun verisini ve hata durumunu state'te tutuyoruz
  const [qrData, setQrData] = useState("");
  const [error, setError] = useState("");

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Hasta Özeti QR Kod Okuyucu</h2>
      <p>Hastadan aldığınız QR kodu kameraya gösterin.</p>
      <div style={{ maxWidth: 300, margin: "0 auto" }}>
        <QrReader
          constraints={{ facingMode: "environment" }} // Arka kamera öncelikli
          onResult={(result, err) => {
            if (!!result) {
              setQrData(result?.text);
              setError("");
            }
            if (!!err && err.name !== "NotFoundException") {
              setError("QR kod okunamadı: " + err.message);
            }
          }}
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