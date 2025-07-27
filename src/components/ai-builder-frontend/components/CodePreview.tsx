import React from 'react';

const CodePreview: React.FC<{ html: string }> = ({ html }) => {
  return (
    <div className="h-[500px] border rounded">
      <iframe
        title="preview"
        srcDoc={html}
        className="w-full h-full"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default CodePreview;
