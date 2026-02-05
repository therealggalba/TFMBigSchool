'use client';

import { useState, useRef, useEffect } from 'react';
import { WebLLMProvider } from '@/lib/web-llm-provider';
import Message from './Message';
import Input from './Input';
import styles from './Chat.module.scss';

export default function Chat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Inicializando motor de IA...');
  const [isTyping, setIsTyping] = useState(false);
  
  const providerRef = useRef<WebLLMProvider | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initEngine = async () => {
      providerRef.current = new WebLLMProvider();
      try {
        await providerRef.current.init((report) => {
          setLoadingProgress(report.progress * 100);
          setLoadingText(report.text);
        });
        setIsInitializing(false);
      } catch (error) {
        console.error("Failed to init Web-LLM:", error);
        setLoadingText("Error al cargar la IA. Por favor, recarga la página.");
      }
    };
    initEngine();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!providerRef.current) return;

    const userMessage = { role: 'user' as const, content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      // Placeholder for assistant response
      const assistantMessageIndex = newMessages.length;
      setMessages([...newMessages, { role: 'assistant', content:  '...'}]);

      await providerRef.current.sendMessage(newMessages, (updatedContent) => {
        setMessages(prev => {
          const updated = [...prev];
          updated[assistantMessageIndex] = { role: 'assistant', content: updatedContent };
          return updated;
        });
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      {isInitializing && (
        <div className={styles.loadingOverlay}>
          <h3>Configurando Llama-3-8B</h3>
          <p>{loadingText}</p>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '10px' }}>
            La primera carga puede tardar unos minutos (descarga de ~5GB)
          </p>
        </div>
      )}

      <div className={styles.messagesList}>
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && messages[messages.length-1]?.role === 'user' && (
           <Message role="assistant" content="..." />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <Input onSend={handleSendMessage} disabled={isInitializing || isTyping} />
      </div>
    </div>
  );
}
