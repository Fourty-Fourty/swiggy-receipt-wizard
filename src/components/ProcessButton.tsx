
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

interface ProcessButtonProps {
  onClick: () => void;
  isProcessing: boolean;
}

const ProcessButton = ({ onClick, isProcessing }: ProcessButtonProps) => {
  return (
    <motion.div
      className="flex justify-center mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Button 
        onClick={onClick}
        disabled={isProcessing}
        size="lg"
        className="bg-swiggy-orange hover:bg-swiggy-orange/90 text-white py-6 px-8 font-medium text-base rounded-lg transition-all duration-300"
      >
        {isProcessing ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          'Process Emails'
        )}
      </Button>
    </motion.div>
  );
};

export default ProcessButton;
