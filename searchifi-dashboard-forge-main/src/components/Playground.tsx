
import { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { PreviewPane } from './PreviewPane';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'html', label: 'HTML', color: 'text-orange-400' },
  { id: 'css', label: 'CSS', color: 'text-blue-400' },
  { id: 'react', label: 'React', color: 'text-cyan-400' },
  { id: 'tailwind', label: 'TailwindCSS', color: 'text-teal-400' }
];

const defaultCode = {
  html: `<div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
    Welcome to Searchifi
  </h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">UI Components</h2>
      <p class="text-gray-600">Beautiful, reusable components for your projects.</p>
    </div>
    <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Templates</h2>
      <p class="text-gray-600">Ready-to-use templates to kickstart your development.</p>
    </div>
    <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">UI Kits</h2>
      <p class="text-gray-600">Complete design systems for consistent UIs.</p>
    </div>
  </div>
</div>`,
  css: `/* Custom styles */
.container {
  max-width: 1200px;
}

.hover\\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}`,
  react: `// React component example
function App() {
  return (
    <div className="p-8">
      <h1>React Component</h1>
    </div>
  );
}`,
  tailwind: `/* TailwindCSS utilities */
@tailwind base;
@tailwind components;
@tailwind utilities;`
};

export function Playground() {
  const [activeTab, setActiveTab] = useState('html');
  const [code, setCode] = useState(defaultCode);

  const handleCodeChange = (language: string, value: string) => {
    setCode(prev => ({
      ...prev,
      [language]: value
    }));
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="h-16 border-b border-white/10 flex items-center px-6">
        <h1 className="text-xl font-semibold text-white">Playground</h1>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-searchifi-gradient rounded-lg text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all">
            Save
          </button>
          <button className="px-4 py-2 bg-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-colors">
            Share
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Code Editor Section */}
        <div className="flex-1 flex flex-col border-r border-white/10">
          {/* Tabs */}
          <div className="h-12 border-b border-white/10 flex items-center px-4">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className={tab.color}>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 bg-gray-900/50">
            <CodeEditor
              language={activeTab}
              value={code[activeTab as keyof typeof code]}
              onChange={(value) => handleCodeChange(activeTab, value)}
              placeholder={`Enter your ${activeTab.toUpperCase()} code here...`}
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/2 p-4">
          <div className="h-full glass rounded-xl overflow-hidden">
            <PreviewPane
              html={code.html}
              css={code.css}
              react={code.react}
              tailwind={code.tailwind}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
