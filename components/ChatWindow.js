'use client'
import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import FinishChatButton from './FinishChatButton';
import ShowSummaryQR from './ShowSummaryQR';
import { motion } from 'framer-motion';

/**
 * ChatWindow componenti, tüm sohbet akışını ve özel efektleri yönetir.
 * - Karşılama mesajı
 * - Hasta ve asistan mesajları
 * - Asistanın sohbeti bitirme sorusu
 * - Sohbeti bitir ve QR kod oluştur butonu
 * - Özet ve QR kod gösterimi
 */
const ChatWindow = () => {
  // Mesajlar dizisi: { text: string, isUser: bool, isSystem: bool }
  const [messages, setMessages] = useState([
    { text: 'Merhaba, ben MediMind Asistanı. Lütfen şikayetinizi yazın, size yardımcı olacağım.', isUser: false, isSystem: true }
  ]);
  // Özet ve QR kodu gösteriliyor mu?
  const [showSummary, setShowSummary] = useState(false);
  // Loading durumu (asistan cevap bekleniyor mu?)
  const [loading, setLoading] = useState(false);
  // Özet ve QR kod verileri
  const [summary, setSummary] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');
  // Scroll için referans
  const bottomRef = useRef(null);

  // Her mesajdan sonra otomatik scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showSummary]);

  // Kullanıcı mesajı gönderdiğinde
  const handleSend = async (userMessage) => {
    // Mesajı ekle
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setLoading(true);

    // OpenAI API ile asistan cevabı al
    const assistantReply = await getAssistantReply();
    setMessages(prev => [...prev, { text: assistantReply, isUser: false }]);
    setLoading(false);
  };

  // Sohbeti bitir ve özet/QR kodu göster
  const handleFinish = async () => {
    setShowSummary(true);
    // Sadece gerçek sohbet mesajlarını (isSystem:false) summary API'sine gönderiyoruz
    const apiMessages = messages.filter(m => !m.isSystem);
    const { summary, qrImageUrl } = await getSummaryAndQR(apiMessages);
    setSummary(summary);
    setQrImageUrl(qrImageUrl);
  };

  // OpenAI API ile asistan cevabı alma
  async function getAssistantReply() {
    // Sadece gerçek kullanıcı ve asistan mesajlarını API'ye gönderiyoruz (isSystem:true olanlar hariç)
    const apiMessages = messages.filter(m => !m.isSystem);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });
      const data = await response.json();
      if (data.success) {
        return data.reply;
      } else {
        return 'Üzgünüm, şu anda yardımcı olamıyorum.';
      }
    } catch {
      return 'Bir hata oluştu, lütfen tekrar deneyin.';
    }
  }

  // Özet ve QR kodu alma fonksiyonunda parametre olarak mesajları al
  async function getSummaryAndQR(apiMessages) {
    try {
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });
      const data = await response.json();
      if (data.success) {
        return { summary: data.summary, qrImageUrl: data.qrDataUrl };
      } else {
        return { summary: 'Özet alınamadı.', qrImageUrl: '' };
      }
    } catch {
      return { summary: 'Bir hata oluştu.', qrImageUrl: '' };
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col h-[80vh] bg-blue-50 rounded-3xl shadow-2xl p-4 relative overflow-hidden">
      {/* Sohbet baloncukları */}
      <div className="flex-1 overflow-y-auto pb-2">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg.text} isUser={msg.isUser} />
        ))}
        {/* Asistan cevabı bekleniyorsa loading animasyonu */}
        {loading && (
          <motion.div
            className="flex justify-start items-center gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150" />
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300" />
            <span className="ml-2 text-blue-500">Asistan yazıyor...</span>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>
      {/* Sohbet bitirme ve özet/QR kod gösterimi */}
      {showSummary ? (
        <ShowSummaryQR summary={summary} qrImageUrl={qrImageUrl} />
      ) : (
        <>
          <ChatInput onSend={handleSend} disabled={loading} />
          <FinishChatButton onClick={handleFinish} />
        </>
      )}
    </div>
  );
};

export default ChatWindow; 