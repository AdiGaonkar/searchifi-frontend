// LivePreview.tsx
import React from "react";

interface LivePreviewProps {
  codeType: string;
  html?: string;
  css?: string;
  sourceCode?: string;
}

const LivePreview = ({ codeType, html = "", css = "", sourceCode = "" }: LivePreviewProps) => {
  if (codeType === "html-css") {
    const content = `
      <html>
        <head><style>${css}</style></head>
        <body>${html}</body>
      </html>
    `;
    return (
      <iframe
        title="Live Preview"
        className="w-full h-96 border rounded mt-4"
        srcDoc={content}
        sandbox="allow-scripts allow-same-origin"
      />
    );
  }

  return (
    <div className="p-4 mt-4 border border-dashed rounded text-muted-foreground">
      Live preview not supported for React/Tailwind code. You can add a GitHub repo or video demo.
    </div>
  );
};

export default LivePreview;