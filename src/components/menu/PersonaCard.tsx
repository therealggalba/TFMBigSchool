'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Persona } from '@/lib/schemas/persona';
import styles from './PersonaCard.module.scss';

interface PersonaCardProps {
  persona: Persona;
}

export default function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <Link href={`/chat/${persona.id}`} className={styles.card}>
      <div className={styles.avatarWrapper}>
        <Image 
          src={persona.avatar.mainImage} 
          alt={persona.personalData.name}
          width={120}
          height={120}
        />
      </div>
      <h2 className={styles.name}>{persona.personalData.name}</h2>
      <p className={styles.profession}>{persona.personalData.profession}</p>
    </Link>
  );
}
