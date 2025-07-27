import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Sidebar } from '@/components/API tester/Sidebar';
import { RequestBuilder } from '@/components/API tester/Requestbuilder';
import { ResponseViewer } from '@/components/API tester/Responseviewer';
import { useToast } from '@/hooks/use-toast';

interface RequestItem {
  id: string;
  name: string;
  method: string;
  url: string;
  body: string;
}

interface ResponseData {
  data: string;
  status: number;
  statusText: string;
  responseTime: number;
}

const Index = () => {
  const { toast } = useToast();
  const [collections, setCollections] = useState<RequestItem[]>([
    {
      id: uuidv4(),
      name: 'Sample Login Request',
      method: 'POST',
      url: 'https://backend-for-thesearchifi.onrender.com/api/auth/login',
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'password123'
      }, null, 2),
    },
  ]);

  const [activeRequestId, setActiveRequestId] = useState<string>(collections[0].id);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const activeRequest = collections.find((r) => r.id === activeRequestId);

  const updateActiveRequest = (key: keyof Omit<RequestItem, 'id'>, value: string) => {
    setCollections((prev) =>
      prev.map((item) =>
        item.id === activeRequestId ? { ...item, [key]: value } : item
      )
    );
  };

  const handleSend = async () => {
    if (!activeRequest) return;
    
    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      // Validate JSON body for non-GET requests
      let requestBody = undefined;
      if (activeRequest.method !== 'GET' && activeRequest.body.trim()) {
        try {
          requestBody = JSON.parse(activeRequest.body);
        } catch (error) {
          toast({
            title: 'Invalid JSON',
            description: 'Please check your request body for valid JSON syntax.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
      }

      const res = await axios({
        method: activeRequest.method.toLowerCase(),
        url: activeRequest.url,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: requestBody,
        timeout: 30000, // 30 second timeout
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      const formattedData = JSON.stringify(res.data, null, 2);
      const responseData: ResponseData = {
        data: formattedData,
        status: res.status,
        statusText: res.statusText,
        responseTime,
      };
      
      setResponse(responseData);
      localStorage.setItem('lastResponse', JSON.stringify(responseData));
      
      toast({
        title: 'Request Successful',
        description: `${res.status} ${res.statusText} • ${responseTime}ms`,
      });
      
    } catch (err: any) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      let errorData;
      let status = 0;
      let statusText = 'Network Error';
      
      if (err.response) {
        // Server responded with error status
        errorData = err.response.data;
        status = err.response.status;
        statusText = err.response.statusText;
      } else if (err.request) {
        // Request was made but no response received
        errorData = { 
          error: 'No response received',
          message: 'The request was sent but no response was received. Check if the server is running.',
          code: err.code || 'NETWORK_ERROR'
        };
      } else {
        // Error setting up the request
        errorData = { 
          error: 'Request Error',
          message: err.message,
        };
      }
      
      const formattedError = JSON.stringify(errorData, null, 2);
      const responseData: ResponseData = {
        data: formattedError,
        status,
        statusText,
        responseTime,
      };
      
      setResponse(responseData);
      
      toast({
        title: 'Request Failed',
        description: `${status ? `${status} ${statusText}` : 'Network error'} • ${responseTime}ms`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRequest = () => {
    const newRequest: RequestItem = {
      id: uuidv4(),
      name: 'New Request',
      method: 'GET',
      url: '',
      body: '',
    };
    setCollections((prev) => [...prev, newRequest]);
    setActiveRequestId(newRequest.id);
  };

  const handleRenameRequest = (id: string, newName: string) => {
    setCollections((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const handleDeleteRequest = (id: string) => {
    setCollections((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (updated.length === 0) {
        // Don't allow deleting the last request
        toast({
          title: 'Cannot Delete',
          description: 'At least one request must remain.',
          variant: 'destructive',
        });
        return prev;
      }
      
      if (id === activeRequestId) {
        setActiveRequestId(updated[0].id);
      }
      return updated;
    });
  };

  // Load saved response on mount
  useEffect(() => {
    const saved = localStorage.getItem('lastResponse');
    if (saved) {
      try {
        setResponse(JSON.parse(saved));
      } catch (error) {
        // Invalid saved data, ignore
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar
        collections={collections}
        activeRequestId={activeRequestId}
        onAddRequest={handleAddRequest}
        onSelectRequest={setActiveRequestId}
        onRenameRequest={handleRenameRequest}
        onDeleteRequest={handleDeleteRequest}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Request Builder */}
        <RequestBuilder
          method={activeRequest?.method || 'GET'}
          url={activeRequest?.url || ''}
          body={activeRequest?.body || ''}
          onMethodChange={(method) => updateActiveRequest('method', method)}
          onUrlChange={(url) => updateActiveRequest('url', url)}
          onBodyChange={(body) => updateActiveRequest('body', body)}
          onSend={handleSend}
          isLoading={isLoading}
        />
        {/* Response Viewer */}
        <ResponseViewer
          response={response?.data || null}
          status={response?.status}
          statusText={response?.statusText}
          responseTime={response?.responseTime}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
