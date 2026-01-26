'use client';

import React from 'react';
import PDFExportButton from './PDFExportButton';

interface PlanActionsProps {
  targetElementId: string;
  filename: string;
}

export default function PlanActions({ targetElementId, filename }: PlanActionsProps) {
  return (
    <div className="action-bar" aria-label="Export and print controls">
      <PDFExportButton targetElementId={targetElementId} filename={filename} />
      <button
        type="button"
        className="action-button action-button--secondary"
        onClick={() => window.print()}
      >
        Print
      </button>
    </div>
  );
}
