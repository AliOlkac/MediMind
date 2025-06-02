import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * FinishChatButton componenti, sohbeti bitirip QR kod ve özet oluşturmak için kullanılır.
 * Animasyonlu bir şekilde ekrana gelir.
 * @param {function} onClick - Butona tıklanınca çalışacak fonksiyon
 */
const FinishChatButton = ({ onClick }) => {
  return (
    <motion.button
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="mt-4 px-6 py-3 bg-green-400 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg text-lg transition-all"
      onClick={onClick}
    >
      Sohbeti Bitir ve QR Kodunu Oluştur
    </motion.button>
  );
};

FinishChatButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default FinishChatButton; 