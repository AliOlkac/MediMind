// pages/api/chat.js
// Bu API route'u, hasta ile yapay zeka arasındaki sohbet mesajlarını Firestore'a kaydeder ve listeler.

import { db } from "../../src/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

export default async function handler(req, res) {
  // POST: Yeni mesaj ekle
  if (req.method === "POST") {
    try {
      // İstekten gelen mesajı al
      const { userId, mesaj, rol } = req.body;
      // Firestore'da 'chats' koleksiyonuna yeni bir belge ekle
      const docRef = await addDoc(collection(db, "chats"), {
        userId: userId || "anonim", // Kullanıcı ID'si yoksa anonim olarak kaydet
        mesaj,
        rol, // "hasta" veya "asistan"
        zaman: new Date().toISOString()
      });
      return res.status(200).json({ success: true, id: docRef.id });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // GET: Tüm mesajları sırayla getir
  if (req.method === "GET") {
    try {
      // Mesajları zamana göre sıralı şekilde çek
      const q = query(collection(db, "chats"), orderBy("zaman", "asc"));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // Diğer HTTP metodları için hata döndür
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 