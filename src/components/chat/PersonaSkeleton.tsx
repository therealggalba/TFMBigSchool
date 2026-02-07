'use client';

import React from 'react';
import Image from 'next/image';
import { Persona } from '@/lib/schemas/persona';
import styles from './PersonaSkeleton.module.scss';

interface PersonaSkeletonProps {
  persona: Persona;
}

export default function PersonaSkeleton({ persona }: PersonaSkeletonProps) {
  return (
    <div className={styles.skeletonOverlay}>
      <div className={styles.content}>
        <div className={styles.avatarPulse}>
          <Image 
            src={persona.avatar.mainImage} 
            alt={persona.personalData.name}
            width={200}
            height={200}
            priority
          />
        </div>
        
        <div className={styles.info}>
          <h2 className={styles.title}>Inyectando personalidad de {persona.personalData.name}...</h2>
          <p className={styles.quote}>"Poco a poco se llega lejos."</p>
          
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Especialidad:</span>
              <span className={styles.value}>{persona.knowledge.expertise.join(', ')}</span>
            </div>
          </div>
          
          <div className={styles.loadingPulse}>
            <span>Preparando sesión educativa</span>
            <div className={styles.dots}>
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
