'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useWebLLM } from '@/lib/contexts/web-llm-context';
import { Persona } from '@/lib/schemas/persona';
import { buildSystemPrompt } from '@/lib/prompt-builder';
import Message from './Message';
import Input from './Input';
import PersonaSkeleton from './PersonaSkeleton';
import styles from './Chat.module.scss';

interface ChatProps {
  persona?: Persona;
}

export default function Chat({ persona }: ChatProps) {
  const { engine, isInitialized } = useWebLLM();
  const [messages, setMessages] = useState<{ role: 'system' | 'user' | 'assistant'; content: string }[]>([]);
  const [isInjectingPersonality, setIsInjectingPersonality] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize personality prompt
  useEffect(() => {
    if (persona && isInitialized) {
      const systemPrompt = buildSystemPrompt(persona);
      setMessages([{ role: 'system', content: systemPrompt }]);
      
      // Simulate a brief "injection" delay for UX polish
      const timer = setTimeout(() => {
        setIsInjectingPersonality(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [persona, isInitialized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!engine || !isInitialized) return;

    const userMessage = { role: 'user' as const, content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const assistantMessageIndex = newMessages.length;
      setMessages([...newMessages, { role: 'assistant', content:  '...'}]);

      await engine.sendMessage(newMessages, (updatedContent) => {
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
  }, [engine, isInitialized, messages]);

  // Show skeleton if LLM is not ready or if we are still "injecting" the persona logic
  if (!isInitialized || isInjectingPersonality) {
    return persona ? <PersonaSkeleton persona={persona} /> : null;
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesList}>
        {messages
          .filter(msg => msg.role !== 'system')
          .map((msg, i) => (
            <Message key={i} role={msg.role as 'user' | 'assistant'} content={msg.content} />
          ))}
        {isTyping && messages[messages.length-1]?.role === 'user' && (
           <Message role="assistant" content="..." />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <Input onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
