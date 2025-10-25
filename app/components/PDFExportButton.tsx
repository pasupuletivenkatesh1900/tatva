'use client';

import React from 'react';

declare global {
  interface Window {
    html2pdf: any;
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
      const element = document.getElementById(targetElementId) || document.body;
      
      // Get the height of the content
      const totalHeight = element.scrollHeight;
      
      const options = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          scrollY: 0,
          useCORS: true,
          allowTaint: true
        },
        jsPDF: {
          unit: 'mm',
          format: [210, totalHeight * 0.264], // custom height in mm for continuous page
          orientation: 'portrait'
        },
        pageBreak: { mode: 'avoid' }
      };

      window.html2pdf().set(options).from(element).save();
    } else {
      alert('PDF library not loaded. Please refresh the page and try again.');
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="pdf-export-button"
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        margin: '10px 0',
        transition: 'background-color 0.2s'
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
    >
      📄 Export as PDF
    </button>
  );
};

export default PDFExportButton;