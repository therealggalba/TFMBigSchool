'use client';

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { WebLLMProvider } from '../web-llm-provider';
import { InitProgressReport } from '@mlc-ai/web-llm';

interface WebLLMContextType {
  engine: WebLLMProvider | null;
  isInitialized: boolean;
  isInitializing: boolean;
  loadingProgress: number;
  loadingText: string;
  initEngine: () => Promise<void>;
  error: string | null;
}

const WebLLMContext = createContext<WebLLMContextType | undefined>(undefined);

export function WebLLMProviderContext({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const providerRef = useRef<WebLLMProvider | null>(null);

  const initEngine = useCallback(async () => {
    if (providerRef.current?.isInitialized() || isInitializing) return;

    setIsInitializing(true);
    setError(null);
    
    if (!providerRef.current) {
      providerRef.current = new WebLLMProvider();
    }

    try {
      await providerRef.current.init((report: InitProgressReport) => {
        setLoadingProgress(report.progress * 100);
        setLoadingText(report.text);
      });
      setIsInitialized(true);
    } catch (err) {
      console.error("Failed to init Web-LLM globally:", err);
      setError("Error al cargar el motor de IA. Por favor, intenta de nuevo.");
    } finally {
      setIsInitializing(false);
    }
  }, [isInitializing]);

  return (
    <WebLLMContext.Provider value={{
      engine: providerRef.current,
      isInitialized,
      isInitializing,
      loadingProgress,
      loadingText,
      initEngine,
      error
    }}>
      {children}
    </WebLLMContext.Provider>
  );
}

export function useWebLLM() {
  const context = useContext(WebLLMContext);
  if (context === undefined) {
    throw new Error('useWebLLM must be used within a WebLLMProviderContext');
  }
  return context;
}
