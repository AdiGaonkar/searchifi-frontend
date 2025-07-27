
import { useEffect, useState } from 'react';

interface PreviewPaneProps {
  html: string;
  css: string;
  react?: string;
  tailwind?: string;
}

export function PreviewPane({ html, css, react, tailwind }: PreviewPaneProps) {
  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    // Combine HTML and CSS for preview
    const combinedContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;
    setPreviewContent(combinedContent);
  }, [html, css, react, tailwind]);

  return (
    <div className="h-full bg-white rounded-lg overflow-hidden">
      <div className="h-8 bg-gray-100 border-b flex items-center px-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-600">Preview</span>
        </div>
      </div>
      <iframe
        srcDoc={previewContent}
        className="w-full h-[calc(100%-32px)] border-none"
        title="Code Preview"
      />
    </div>
  );
}
