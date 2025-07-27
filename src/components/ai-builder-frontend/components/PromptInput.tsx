import React, { useState } from 'react';
import { generateWebsite } from '@/utils/openai';

const PromptInput: React.FC<{ setCode: (html: string) => void }> = ({ setCode }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const html = await generateWebsite(prompt);
      setCode(html);
    } catch (err) {
      alert('❌ Failed to generate website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="e.g. Create a landing page for a pizza shop"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="flex-1 border p-2 rounded"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
    </div>
  );
};

export default PromptInput;
