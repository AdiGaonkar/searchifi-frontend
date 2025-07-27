
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CodeEditor({ language, value, onChange, placeholder }: CodeEditorProps) {
  return (
    <div className="relative h-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-full resize-none bg-transparent text-gray-100 code-editor",
          "border-none outline-none p-4",
          "placeholder:text-gray-500"
        )}
        spellCheck={false}
      />
      
      {/* Language indicator */}
      <div className="absolute top-2 right-2 px-2 py-1 bg-gray-800/50 rounded text-xs text-gray-400 font-mono">
        {language.toUpperCase()}
      </div>
    </div>
  );
}
