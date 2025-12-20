import React from 'react';

const PDFViewer = ({ pdfUrl }) => {
  return (
    <div className="flex-1 w-full h-full bg-card rounded-lg shadow-lg overflow-hidden border border-border">
      {pdfUrl ? (
        <iframe
          src={`http://localhost:2000/${pdfUrl}#zoom=80&toolbar=0&navpanes=0`}
          className="w-full h-full"
          title="PDF Viewer"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8">
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">Could Not Find Resource!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
