import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ResponseViewerProps {
  response: string | null;
  status?: number;
  statusText?: string;
  responseTime?: number;
  isLoading?: boolean;
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({
  response,
  status,
  statusText,
  responseTime,
  isLoading = false,
}) => {
  const getStatusVariant = (status?: number) => {
    if (!status) return 'secondary';
    if (status >= 200 && status < 300) return 'default';
    if (status >= 400) return 'destructive';
    return 'secondary';
  };

  const getStatusColor = (status?: number) => {
    if (!status) return '';
    if (status >= 200 && status < 300) return 'text-success';
    if (status >= 400) return 'text-destructive';
    return 'text-warning';
  };

  return (
    <div className="flex-1 flex flex-col ">
      {/* Response Header */}
      <div className="p-4 border-b bg-neutral-900 border-border ">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-semibold text-foreground">Response</h3>
          
          {isLoading && (
            <Badge variant="secondary" className="animate-pulse">
              Sending request...
            </Badge>
          )}
          
          {status && !isLoading && (
            <>
              <Badge variant={getStatusVariant(status)}>
                {status} {statusText}
              </Badge>
              
              {responseTime && (
                <span className="text-xs text-muted-foreground">
                  {responseTime}ms
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Response Body */}
      <div className="flex-1 b p-4 overflow-auto bg-neutral-900">
        <Card className="h-full bg-neutral-800 border-border">
          <div className="p-4 h-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="ml-2">Sending request...</span>
              </div>
            ) : response ? (
              <pre className="text-sm text-foreground font-mono whitespace-pre-wrap overflow-auto h-full">
                {response}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <div className="text-2xl mb-2"></div>
                  <div className="text-sm">Response will appear here</div>
                  <div className="text-xs mt-1">Send a request to see the response</div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};