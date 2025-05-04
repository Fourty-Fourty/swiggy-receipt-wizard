
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.div 
      className="mb-8 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-swiggy-dark">
        <span className="text-swiggy-orange">Swiggy</span> Invoice Finder
      </h1>
      <p className="text-gray-500 mt-2 text-sm md:text-base">
        Find and organize your Swiggy invoices quickly and easily
      </p>
    </motion.div>
  );
};

export default Header;
