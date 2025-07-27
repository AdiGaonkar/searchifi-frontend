import React from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  code: string;
  onChange: (value: string | undefined) => void;
}

const MonacoEditor: React.FC<Props> = ({ code, onChange }) => {
  return (
    <div className="h-[500px] border rounded overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="html"
        value={code}
        onChange={onChange}
      />
    </div>
  );
};

export default MonacoEditor;
