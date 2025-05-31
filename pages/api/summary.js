// pages/api/summary.js
// Bu API route'u, son X sohbet mesajını özetler ve özet metnini QR kod olarak döndürür.

import { db } from "../../src/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Configuration, OpenAIApi } from "openai";
import QRCode from "qrcode";

export default async function handler(req, res) {
  // Sadece POST isteklerini kabul ediyoruz
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // İstekten kullanıcı ID'si ve özetlenecek mesaj sayısını al
    const { userId, mesajSayisi = 10 } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, error: "userId zorunlu." });
    }

    // Firestore'dan son X mesajı çek
    const q = query(
      collection(db, "chats"),
      orderBy("zaman", "desc"),
      limit(mesajSayisi)
    );
    const querySnapshot = await getDocs(q);
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    // Mesajları eskiye göre sırala (en yeni en sonda olacak şekilde)
    messages.reverse();

    // Mesajları özetlemek için OpenAI API'sine gönder
    const openai = new OpenAIApi(
      new Configuration({ apiKey: process.env.OPENAI_API_KEY })
    );
    // Sohbeti metin olarak birleştir
    const chatText = messages.map(m => `${m.rol}: ${m.mesaj}`).join("\n");
    // OpenAI'ya özetleme prompt'u hazırla
    const prompt = `Aşağıdaki hasta ve asistan sohbetini kısa, anlaşılır ve tıbbi olarak özetle:\n${chatText}`;
    // OpenAI'dan özet iste
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 120,
      temperature: 0.5
    });
    const summary = completion.data.choices[0].text.trim();

    // Özet metnini QR kod olarak üret
    const qrDataUrl = await QRCode.toDataURL(summary);

    // Sonucu döndür
    return res.status(200).json({ success: true, summary, qrDataUrl });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
} 