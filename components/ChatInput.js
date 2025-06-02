'use client'
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * ChatInput componenti, kullanıcıdan mesaj alır ve gönderir.
 * Enter tuşu veya buton ile mesaj gönderilebilir.
 * @param {function} onSend - Mesaj gönderme fonksiyonu
 * @param {boolean} disabled - Input alanı devre dışı mı?
 */
const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  // Mesaj gönderme fonksiyonu
  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  // Enter tuşu ile gönderme
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-md mt-2">
      {/* Mesaj input alanı */}
      <textarea
        className="flex-1 resize-none outline-none p-2 rounded-xl bg-blue-50 text-blue-900"
        rows={1}
        placeholder="Şikayetinizi yazın..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        style={{ minHeight: 40, maxHeight: 120 }}
      />
      {/* Gönder butonu */}
      <button
        className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition-all"
        onClick={handleSend}
        disabled={disabled || input.trim() === ''}
      >
        Gönder
      </button>
    </div>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
ChatInput.defaultProps = {
  disabled: false
};

export default ChatInput; 