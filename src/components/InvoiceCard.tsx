
import React from 'react';
import { motion } from 'framer-motion';

const InvoiceCard = () => {
  return (
    <motion.div
      className="absolute top-10 right-10 w-64 h-80 hidden lg:block"
      initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
      animate={{ opacity: 1, scale: 1, rotate: 5 }}
      transition={{ duration: 0.7, delay: 0.8 }}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl bg-white p-4 border border-gray-100">
        <div className="absolute top-0 left-0 right-0 h-6 bg-swiggy-orange"></div>
        
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-swiggy-orange flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div className="ml-2">
              <p className="text-xs font-bold">Swiggy</p>
              <p className="text-xs text-gray-500">Receipt</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">#INV-2023</p>
          </div>
        </div>
        
        <div className="mt-6 border-t border-dashed border-gray-200 pt-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-medium">SW12345678</span>
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-500">Date:</span>
            <span className="font-medium">May 4, 2025</span>
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-500">Payment:</span>
            <span className="font-medium">Card ending 4242</span>
          </div>
        </div>
        
        <div className="mt-4 border-t border-dashed border-gray-200 pt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Subtotal:</span>
            <span>₹489.00</span>
          </div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Delivery:</span>
            <span>₹35.00</span>
          </div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Tax:</span>
            <span>₹26.00</span>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-200">
          <div className="flex justify-between font-bold text-sm">
            <span>Total:</span>
            <span>₹550.00</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceCard;
