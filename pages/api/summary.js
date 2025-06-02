// pages/api/summary.js
// Bu API route'u, frontend'den gelen sohbet mesajlarını özetler ve özet metnini QR kod olarak döndürür.

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import QRCode from "qrcode";

export default async function handler(req, res) {
  // Sadece POST isteklerini kabul ediyoruz
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // İstekten gelen mesajları al
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ success: false, error: "messages dizisi zorunlu." });
    }

    // Son 10 mesajı alıyoruz (özet için yeterli)
    const lastMessages = messages.slice(-10);

    // LangChain ile OpenAI chat modelini başlat
    const chat = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.4,
      openAIApiKey: process.env.OPENAI_API_KEY
    });

    // System prompt: Sohbeti kısa ve anlaşılır özetle
    const systemPrompt = new SystemMessage(
      "Aşağıda hasta ile tıbbi asistan arasında geçen sohbetin kısa, anlaşılır ve tıbbi olarak özetini oluştur. Gereksiz detayları çıkar, önemli şikayetleri ve önerileri vurgula."
    );

    // Mesajları LangChain formatına çevir
    const lcMessages = [
      systemPrompt,
      ...lastMessages.map(m =>
        m.isUser
          ? new HumanMessage(m.text)
          : new AIMessage(m.text)
      )
    ];

    // OpenAI ile özet oluştur
    const response = await chat.invoke(lcMessages);
    const summary = response.content.trim();

    // Özet metnini QR kod olarak üret
    const qrDataUrl = await QRCode.toDataURL(summary);

    // Sonucu döndür
    return res.status(200).json({ success: true, summary, qrDataUrl });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
} 