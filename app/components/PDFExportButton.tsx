'use client';

import React from 'react';

type Html2PdfOptions = {
  margin: number;
  filename: string;
  image: { type: 'jpeg' | 'png'; quality: number };
  html2canvas: {
    scale: number;
    scrollY: number;
    height: number;
    windowHeight: number;
  };
  jsPDF: {
    unit: 'px' | 'mm' | 'pt';
    format: [number, number];
    orientation: 'portrait' | 'landscape';
  };
};

type Html2PdfInstance = {
  set: (options: Html2PdfOptions) => Html2PdfInstance;
  from: (element: HTMLElement) => Html2PdfInstance;
  save: () => void;
};

type Html2PdfFn = () => Html2PdfInstance;

declare global {
  interface Window {
    html2pdf?: Html2PdfFn;
  }
}

interface PDFExportButtonProps {
  targetElementId?: string;
  filename?: string;
}

const PDFExportButton: React.FC<PDFExportButtonProps> = ({ 
  targetElementId = 'pdf-content', 
  filename = 'meal-plan.pdf' 
}) => {
  const generatePDF = () => {
    if (typeof window !== 'undefined' && window.html2pdf) {
      const element = (document.getElementById(targetElementId) || document.body) as HTMLElement;
      
      // Get the actual content height
      const contentHeight = element.scrollHeight;
      
      const options: Html2PdfOptions = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          scrollY: 0,
          height: contentHeight,
          windowHeight: contentHeight
        },
        jsPDF: {
          unit: 'px',
          format: [element.offsetWidth, contentHeight], // Use actual content dimensions
          orientation: 'portrait'
        }
      };

      window.html2pdf()?.set(options).from(element).save();
    } else {
      alert('PDF library not loaded. Please refresh the page and try again.');
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="action-button action-button--primary pdf-export-button"
    >
      Export PDF
    </button>
  );
};

export default PDFExportButton;