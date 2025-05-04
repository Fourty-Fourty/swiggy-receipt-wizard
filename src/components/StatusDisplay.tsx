
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusType = 'processing' | 'success' | 'error' | null;

interface StatusDisplayProps {
  message: string;
  type: StatusType;
  dateRange?: { start: string; end: string };
  folderName?: string;
  sheetName?: string;
}

const StatusDisplay = ({ message, type, dateRange, folderName, sheetName }: StatusDisplayProps) => {
  if (!message) return null;

  return (
    <motion.div
      className={cn(
        "mt-8 p-5 rounded-lg transition-all duration-300",
        type === 'processing' && "bg-amber-50 border border-amber-200",
        type === 'success' && "bg-green-50 border border-green-200",
        type === 'error' && "bg-red-50 border border-red-200",
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {type === 'processing' && (
            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
              <Loader size={14} className="text-white animate-spin" />
            </div>
          )}
          {type === 'success' && (
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
          )}
          {type === 'error' && (
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <X size={14} className="text-white" />
            </div>
          )}
        </div>
        <div>
          <p className={cn(
            "font-medium mb-1",
            type === 'processing' && "text-amber-800",
            type === 'success' && "text-green-800",
            type === 'error' && "text-red-800",
          )}>
            {type === 'processing' && 'Processing'}
            {type === 'success' && 'Success'}
            {type === 'error' && 'Error'}
          </p>
          <p className={cn(
            "text-sm",
            type === 'processing' && "text-amber-700",
            type === 'success' && "text-green-700",
            type === 'error' && "text-red-700",
          )}>
            {message}
          </p>
          
          {dateRange && type === 'processing' && (
            <div className="mt-2 text-xs text-amber-600">
              <p>Date Range: {dateRange.start} to {dateRange.end}</p>
              {folderName && <p className="mt-1">Folder: {folderName}</p>}
              {sheetName && <p className="mt-1">Sheet: {sheetName}</p>}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatusDisplay;
