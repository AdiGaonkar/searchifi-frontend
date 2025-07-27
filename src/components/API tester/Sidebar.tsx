import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/butttonns';
import { Card } from '@/components/ui/card';
import { EditableRequestItem } from './Aditablerequestitem';
import { Plus, Folder, Globe, Clock } from 'lucide-react';
import axios from 'axios';

interface RequestItem {
  id: string;
  name: string;
  method: string;
  url: string;
  body: string;
}

interface SidebarProps {
  collections: RequestItem[];
  activeRequestId: string;
  onAddRequest: () => void;
  onSelectRequest: (id: string) => void;
  onRenameRequest: (id: string, newName: string) => void;
  onDeleteRequest: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collections,
  activeRequestId,
  onAddRequest,
  onSelectRequest,
  onRenameRequest,
  onDeleteRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'collections' | 'history'>('collections');
  const [history, setHistory] = useState<RequestItem[]>([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/api/requests');
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab]);

  return (
    <div className="flex h-full">
      {/* Icon Sidebar */}
      <div className="w-16 bg-neutral-800 border-0 flex flex-col items-center py-4">
        <div className="space-y-4 ">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('collections')}
            className={`w-10 h-10 ${activeTab === 'collections' ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}
            title="Collections"
          >
            <Folder className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-muted-foreground hover:text-foreground"
            title="Environments"
          >
            <Globe className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('history')}
            className={`w-10 h-10 ${activeTab === 'history' ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}
            title="History"
          >
            <Clock className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {activeTab === 'collections' ? 'Collections' : 'Request History'}
            </h2>

            {activeTab === 'collections' && (
              <Button
                variant="ghost"
                size="xs"
                onClick={onAddRequest}
                className="text-primary hover:text-primary hover:bg-primary/10"
                title="Add new request"
              >
                <Plus className="h-4 w-4" />
                New
              </Button>
            )}
          </div>
        </div>

        {/* Panel Content */}
        <div className="flex-1 p-3 bg-neutral-900 overflow-y-auto">
          <div className="space-y-1">
            {activeTab === 'collections' ? (
              collections.length === 0 ? (
                <Card className="p-4 border-dashed border-border bg-background">
                  <div className="text-center text-muted-foreground">
                    <div className="text-lg mb-2">📁</div>
                    <div className="text-sm">No requests yet</div>
                    <div className="text-xs mt-1">Click "New" to create your first request</div>
                  </div>
                </Card>
              ) : (
                collections.map((item) => (
                  <EditableRequestItem
                    key={item.id}
                    item={item}
                    onRename={onRenameRequest}
                    onClick={() => onSelectRequest(item.id)}
                    onDelete={() => onDeleteRequest(item.id)}
                    isActive={activeRequestId === item.id}
                  />
                ))
              )
            ) : (
              history.length === 0 ? (
                <Card className="p-4 border-dashed border-border bg-background">
                  <div className="text-center text-muted-foreground">
                    <div className="text-lg mb-2">🕘</div>
                    <div className="text-sm text-white">No history found</div>
                  </div>
                </Card>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="p-2 border border-border rounded bg-background text-xs">
                    <div className="font-semibold">{item.method} - {item.url}</div>
                    <div className="text-muted-foreground truncate">{item.body}</div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
