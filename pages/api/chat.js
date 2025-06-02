// pages/api/chat.js
// Bu API route'u, frontend'den gelen mesajı LangChain ile OpenAI API'ya iletir ve cevabı döndürür.

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";

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

    // Son 15 mesajı alıyoruz (diyalogun daha fazla kısmını modele iletmek için)
    const lastMessages = messages.slice(-15);

    // LangChain ile OpenAI chat modelini başlat
    const chat = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY
    });

    // System prompt: Akıllı ve akış kontrollü asistan
    const systemPrompt = new SystemMessage(
      "Sen bir tıbbi asistan ve sağlık danışmanısın. Hastanın şikayetini analiz et. Öncelikle, sadece gerekli durumlarda, şikayete özel kısa ve net sorular sorarak bilgi toplamaya çalış. Eğer hasta sorularına yeterli ve mantıklı cevaplar verdiyse, artık yeni soru sorma ve olası nedenleri, ihtimalleri ve önerileri açıkla. Her zaman önceki cevapları dikkate al, aynı soruları tekrar etme. Kesin teşhis koyma, ancak tıbbi bilgiye dayalı olarak hastayı bilgilendir ve yönlendir. Gerektiğinde hangi branş doktora başvurması gerektiğini öner. Empati göster, hastayı rahatlat ve anlaşılır, yardımsever bir dil kullan. Acil bir durum ihtimali varsa mutlaka doktora başvurmasını öner."
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

    // LangChain ile OpenAI'ya istek gönder
    const response = await chat.invoke(lcMessages);
    const reply = response.content.trim();

    // Sonucu döndür
    return res.status(200).json({ success: true, reply });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
} 