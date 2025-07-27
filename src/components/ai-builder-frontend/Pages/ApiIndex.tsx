import React, { useState } from 'react';
import PromptInput from '../components/PromptInput';
import MonacoEditor from '../components/MonacoEditor';
import CodePreview from '../components/CodePreview';

const Home = () => {
  const [code, setCode] = useState('');

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🧠 AI Website Builder</h1>
      <PromptInput setCode={setCode} />
      <div className="grid grid-cols-2 gap-4 mt-6">
        <MonacoEditor code={code} onChange={setCode} />
        <CodePreview html={code} />
      </div>
    </main>
  );
};

export default Home;
