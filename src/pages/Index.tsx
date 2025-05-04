
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Header from '@/components/Header';
import DateSelector from '@/components/DateSelector';
import ProcessButton from '@/components/ProcessButton';
import StatusDisplay from '@/components/StatusDisplay';
import ResultLinks from '@/components/ResultLinks';
import InvoiceCard from '@/components/InvoiceCard';

const Index = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [folderName, setFolderName] = useState('');
  const [sheetName, setSheetName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: 'processing' | 'success' | 'error' | null;
  }>({
    message: '',
    type: null
  });
  const [links, setLinks] = useState<{
    sheetUrl: string | null;
    folderUrl: string | null;
  }>({
    sheetUrl: null,
    folderUrl: null
  });

  const handleDateRangeChange = (start: string, end: string, folder: string, sheet: string) => {
    setStartDate(start);
    setEndDate(end);
    setFolderName(folder);
    setSheetName(sheet);
  };

  const processEmails = () => {
    // Reset previous status
    setLinks({ sheetUrl: null, folderUrl: null });
    
    // Validate dates
    if (!startDate || !endDate) {
      setStatus({
        message: 'Please select valid date range.',
        type: 'error'
      });
      return;
    }

    // Simulate processing
    setIsProcessing(true);
    setStatus({
      message: `Processing emails from ${startDate} to ${endDate}.`,
      type: 'processing'
    });

    // This is a simulation of the API call - would be replaced with actual Google Script API call
    setTimeout(() => {
      setIsProcessing(false);
      
      // For demonstration, let's randomly simulate success or error
      const isSuccess = Math.random() > 0.3; // 70% chance of success
      
      if (isSuccess) {
        setStatus({
          message: `Successfully processed emails from ${startDate} to ${endDate}.`,
          type: 'success'
        });
        setLinks({
          sheetUrl: 'https://docs.google.com/spreadsheets/d/example',
          folderUrl: 'https://drive.google.com/drive/folders/example'
        });
      } else {
        setStatus({
          message: 'Failed to process some emails. Please try again or check permissions.',
          type: 'error'
        });
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl p-6 md:p-10 card-shadow">
          <Header />
          
          <DateSelector onDateRangeChange={handleDateRangeChange} />
          
          <ProcessButton 
            onClick={processEmails} 
            isProcessing={isProcessing} 
          />
          
          <StatusDisplay 
            message={status.message} 
            type={status.type} 
            dateRange={status.type === 'processing' ? { start: startDate, end: endDate } : undefined}
            folderName={status.type === 'processing' ? folderName : undefined}
            sheetName={status.type === 'processing' ? sheetName : undefined}
          />
          
          <ResultLinks 
            sheetUrl={links.sheetUrl} 
            folderUrl={links.folderUrl} 
          />
        </div>
        
        <div className="text-center mt-4 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Swiggy Invoice Finder
        </div>
      </motion.div>
      
      {/* Decorative card */}
      <InvoiceCard />
    </div>
  );
};

export default Index;
