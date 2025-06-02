import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * ShowSummaryQR componenti, sohbet özeti ve QR kodunu animasyonlu şekilde gösterir.
 * @param {string} summary - Sohbet özeti
 * @param {string} qrImageUrl - QR kod görselinin URL'si
 */
const ShowSummaryQR = ({ summary, qrImageUrl }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 16 }}
      className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-3xl shadow-2xl mt-6"
    >
      {/* Sohbet özeti */}
      <div className="text-gray-800 text-lg font-semibold text-center">
        {summary}
      </div>
      {/* QR kod görseli */}
      {qrImageUrl && (
        <img
          src={qrImageUrl}
          alt="QR Kod"
          className="w-40 h-40 object-contain rounded-xl border-2 border-blue-200 shadow-md animate-pulse"
        />
      )}
    </motion.div>
  );
};

ShowSummaryQR.propTypes = {
  summary: PropTypes.string.isRequired,
  qrImageUrl: PropTypes.string
};
ShowSummaryQR.defaultProps = {
  qrImageUrl: ''
};

export default ShowSummaryQR; 