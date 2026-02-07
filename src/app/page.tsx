'use client';

import { useEffect, useState } from 'react';
import { usePersonas } from '@/lib/hooks/use-persona';
import { PersonaService } from '@/lib/services/persona-service';
import { NADAL_SEED_DATA, NADAL_KNOWLEDGE_SOURCES } from '@/lib/data/seed-nadal';
import { ROSALIA_SEED_DATA, ROSALIA_KNOWLEDGE_SOURCES } from '@/lib/data/seed-rosalia';
import { useWebLLM } from '@/lib/contexts/web-llm-context';
import PersonaCard from '@/components/menu/PersonaCard';
import styles from './Home.module.scss';

export default function Home() {
  const { personas, isLoading: isPersonasLoading } = usePersonas();
  const { isInitialized, isInitializing, initEngine, loadingProgress, loadingText } = useWebLLM();
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    const setup = async () => {
      // 1. Seed database with both personas
      setIsSeeding(true);
      await PersonaService.seedDatabase(NADAL_SEED_DATA, NADAL_KNOWLEDGE_SOURCES);
      await PersonaService.seedDatabase(ROSALIA_SEED_DATA, ROSALIA_KNOWLEDGE_SOURCES);
      setIsSeeding(false);

      // 2. Init LLM engine globally
      if (!isInitialized && !isInitializing) {
        initEngine();
      }
    };
    setup();
  }, [initEngine, isInitialized, isInitializing]);

  const isLoading = isPersonasLoading || isSeeding;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Selecciona tu Persona</h1>
      <p className={styles.subtitle}>
        Elige un experto para comenzar una conversación personalizada. 
        Aprende de los mejores en su campo.
      </p>

      {/* LLM Warming Up Indicator */}
      {(isInitializing || !isInitialized) && (
        <div className={styles.llmStatus}>
          <div className={styles.statusInfo}>
            <span>Preparando cerebro del Sistema... {Math.round(loadingProgress)}%</span>
            <span className={styles.smallText}>{loadingText}</span>
          </div>
          <div className={styles.miniProgressBar}>
            <div 
              className={styles.miniProgressFill} 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {personas.map((persona) => (
          <PersonaCard key={persona.id} persona={persona} />
        ))}
        {personas.length === 0 && !isLoading && (
          <p>No hay personalidades disponibles todavía.</p>
        )}
      </div>
    </main>
  );
}
