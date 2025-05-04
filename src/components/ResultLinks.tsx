
import React from 'react';
import { motion } from 'framer-motion';

interface ResultLinksProps {
  sheetUrl?: string | null;
  folderUrl?: string | null;
}

const ResultLinks = ({ sheetUrl, folderUrl }: ResultLinksProps) => {
  if (!sheetUrl && !folderUrl) return null;

  return (
    <motion.div
      className="mt-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex flex-wrap gap-4 justify-center">
        {sheetUrl && (
          <a 
            href={sheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-swiggy-teal hover:bg-swiggy-teal/90 text-white rounded-lg transition-all duration-300"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 14.5H9.5V9.5H14.5V14.5Z"/>
              <path d="M7.5 14.5H2.5V9.5H7.5V14.5Z"/>
              <path d="M7.5 7.5H2.5V2.5H7.5V7.5Z"/>
              <path d="M14.5 7.5H9.5V2.5H14.5V7.5Z"/>
              <path d="M21.5 7.5H16.5V2.5H21.5V7.5Z"/>
              <path d="M21.5 14.5H16.5V9.5H21.5V14.5Z"/>
              <path d="M21.5 21.5H16.5V16.5H21.5V21.5Z"/>
              <path d="M14.5 21.5H9.5V16.5H14.5V21.5Z"/>
              <path d="M7.5 21.5H2.5V16.5H7.5V21.5Z"/>
            </svg>
            View Summary Sheet
          </a>
        )}
        {folderUrl && (
          <a 
            href={folderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-swiggy-orange hover:bg-swiggy-orange/90 text-white rounded-lg transition-all duration-300"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5h-8.5L9.86 3.38A1.5 1.5 0 0 0 8.59 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Zm-2 14H6V6h2.5l1.64 1.64A1.5 1.5 0 0 0 11.41 8H18Z" />
            </svg>
            View Drive Folder
          </a>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        (To download folder contents, open the folder link and use the Google Drive download option.)
      </p>
    </motion.div>
  );
};

export default ResultLinks;
