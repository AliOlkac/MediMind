// pages/api/firestore-example.js
// Bu API route'u, Firestore'a örnek veri yazma ve okuma işlemlerini gösterir.
// Hem POST (yazma) hem de GET (okuma) isteklerini destekler.

import { db } from "../../src/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  // POST isteğiyle yeni veri ekleme
  if (req.method === "POST") {
    try {
      // Firestore'da 'testCollection' adında bir koleksiyona veri ekliyoruz
      const docRef = await addDoc(collection(db, "testCollection"), {
        mesaj: "Merhaba Aliqo! Firestore bağlantın çalışıyor.",
        zaman: new Date().toISOString()
      });
      // Başarılı olursa, eklenen belgenin ID'sini döndür
      return res.status(200).json({ success: true, id: docRef.id });
    } catch (error) {
      // Hata olursa, hata mesajını döndür
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // GET isteğiyle koleksiyondan veri çekme
  if (req.method === "GET") {
    try {
      // 'testCollection' koleksiyonundaki tüm belgeleri çekiyoruz
      const querySnapshot = await getDocs(collection(db, "testCollection"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      // Başarılı olursa, verileri döndür
      return res.status(200).json({ success: true, data });
    } catch (error) {
      // Hata olursa, hata mesajını döndür
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // Diğer HTTP metodları için hata döndür
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 