import React from 'react';
import { Button } from '@/components/ui/butttonns';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';

import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';

interface RequestBuilderProps {
  method: string;
  url: string;
  body: string;
  onMethodChange: (method: string) => void;
  onUrlChange: (url: string) => void;
  onBodyChange: (body: string) => void;
  onSend: () => void;
  isLoading?: boolean;
}

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export const RequestBuilder: React.FC<RequestBuilderProps> = ({
  method,
  url,
  body,
  onMethodChange,
  onUrlChange,
  onBodyChange,
  onSend,
  isLoading = false,
}) => {
  return (
    <div className="p-6 border-b bg-neutral-900 border-border">
      {/* Method and URL Row */}
      <div className="flex gap-3 mb-6">
        <Select value={method} onValueChange={onMethodChange}>
          <SelectTrigger className="w-32 bg-input  border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {HTTP_METHODS.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          className="flex-1 bg-input border-border"
          placeholder="Enter request URL (e.g., https://backend-for-thesearchifi.onrender.com/api/endpoint)"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
        />

        <Button
          onClick={onSend}
          disabled={!url || isLoading}
          className="px-6"
        >
          <Send className="h-4 w-4 mr-1" />
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>

      {/* Request Body */}
      {method !== 'GET' && (
        <div>
          <div className="mb-3">
            <label className="text-sm font-medium text-muted-foreground">
              Request Body (JSON)
            </label>
          </div>
          <div className="border border-border rounded-md overflow-hidden">
            <CodeMirror
              value={body}
              height="200px"
              theme={oneDark}
              extensions={[json()]}
              onChange={(value) => onBodyChange(value)}
              basicSetup={{
                autocompletion: true,
                bracketMatching: true,
                highlightActiveLine: true,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
