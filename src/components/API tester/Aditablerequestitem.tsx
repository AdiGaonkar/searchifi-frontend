import React, { useState } from 'react';
import { Button } from '@/components/ui/butttonns';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

interface RequestItem {
  id: string;
  name: string;
  method: string;
  url: string;
  body: string;
}

interface EditableRequestItemProps {
  item: RequestItem;
  onRename: (id: string, newName: string) => void;
  onClick: () => void;
  onDelete: () => void;
  isActive: boolean;
}

export const EditableRequestItem: React.FC<EditableRequestItemProps> = ({
  item,
  onRename,
  onClick,
  onDelete,
  isActive,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(item.name);

  const handleBlur = () => {
    setIsEditing(false);
    onRename(item.id, inputValue.trim() || 'Untitled');
  };

  const getMethodVariant = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'method-get';
      case 'POST':
        return 'method-post';
      case 'PUT':
        return 'method-put';
      case 'DELETE':
        return 'method-delete';
      case 'PATCH':
        return 'method-patch';
      default:
        return 'method';
    }
  };

  return (
    <div
      className={`group flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
        isActive 
          ? 'bg-accent text-accent-foreground' 
          : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
        <Button
          variant={getMethodVariant(item.method)}
          size="xs"
          className="pointer-events-none text-amber-500 bg-stone-500 flex-shrink-0"
        >
          {item.method}
        </Button>
        
        {isEditing ? (
          <Input
            autoFocus
            className="h-6 text-xs bg-input flex-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleBlur();
              if (e.key === 'Escape') {
                setIsEditing(false);
                setInputValue(item.name);
              }
            }}
          />
        ) : (
          <span 
            className="text-xs truncate flex-1 min-w-0"
            onClick={() => setIsEditing(true)}
            title={item.name}
          >
            {item.name}
          </span>
        )}
      </div>
      
      <Button
        variant="ghost"
        size="xs"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete request"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
};