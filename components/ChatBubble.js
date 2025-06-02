import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * ChatBubble componenti, hasta ve asistan mesajlarını farklı renk ve animasyonlarla gösterir.
 * Su balonu efekti için Framer Motion kullanılır.
 * @param {string} message - Mesaj içeriği
 * @param {boolean} isUser - Kullanıcı (hasta) mesajı mı?
 */
const ChatBubble = ({ message, isUser }) => {
  return (
    <motion.div
      initial={{ scale: 0.7, y: 30, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`max-w-xs md:max-w-md p-4 my-2 rounded-3xl shadow-lg text-base break-words
        ${isUser ? 'bg-blue-200 text-blue-900 self-end rounded-br-2xl' : 'bg-green-100 text-green-900 self-start rounded-bl-2xl'}
        relative overflow-hidden`
      }
      style={{
        borderBottomRightRadius: isUser ? '1.5rem 2.5rem' : undefined,
        borderBottomLeftRadius: !isUser ? '1.5rem 2.5rem' : undefined,
        boxShadow: '0 4px 24px 0 rgba(0, 180, 255, 0.08)'
      }}
    >
      {/* Mesaj içeriği */}
      {message}
      {/* Su damlası efekti için ekstra bir animasyon eklenebilir */}
      <motion.span
        className="absolute bottom-0 right-2 w-3 h-3 bg-blue-300 rounded-full opacity-60"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
        style={{ display: isUser ? 'block' : 'none' }}
      />
    </motion.div>
  );
};

// Prop tipleri ve varsayılan değerler
ChatBubble.propTypes = {
  message: PropTypes.string.isRequired,
  isUser: PropTypes.bool
};
ChatBubble.defaultProps = {
  isUser: false
};

export default ChatBubble; 