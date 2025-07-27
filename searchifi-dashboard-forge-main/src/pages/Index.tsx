
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Playground } from '@/components/Playground';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <Playground />
    </div>
  );
};

export default Index;
