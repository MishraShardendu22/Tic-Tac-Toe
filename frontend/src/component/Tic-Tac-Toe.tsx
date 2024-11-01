import React from 'react';
import { motion } from 'framer-motion';

interface TicTacToeSquareProps {
  value: string | null;
  onClick: () => void;
}

const TicTacToeSquare: React.FC<TicTacToeSquareProps> = ({ value, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-24 h-24 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 cursor-pointer 
                transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:shadow-lg
                items-center justify-center text-3xl font-bold text-white"
    >
      {value}
    </motion.div>
  );
};

export default TicTacToeSquare;
