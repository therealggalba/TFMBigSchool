'use client';

import { useParams } from 'next/navigation';
import { usePersona } from '@/lib/hooks/use-persona';
import Chat from '@/components/chat/Chat';
import styles from './ChatPage.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function ChatPage() {
  const { id } = useParams();
  const { persona, isLoading } = usePersona(id as string);

  if (isLoading) {
    return <div className={styles.loading}>Conectando con {id}...</div>;
  }

  if (!persona) {
    return <div className={styles.error}>No se ha encontrado la persona seleccionada.</div>;
  }

  return (
    <main className={styles.container}>
      {/* Left Column: Personality Identity */}
      <aside className={styles.leftColumn}>
        <div className={styles.largeAvatarContainer}>
          <Image 
            src={persona.avatar.mainImage} 
            alt={persona.personalData.name}
            width={400}
            height={600}
            className={styles.fullAvatar}
            priority
          />
        </div>
        <div className={styles.sidebarIdentity}>
            <h2>{persona.personalData.name}</h2>
            <p>{persona.personalData.profession}</p>
        </div>
      </aside>

      {/* Main Content Area (Header + Chat + Right Column) */}
      <div className={styles.mainContentArea}>
        <header className={styles.header}>
            <div className={styles.headerProfile}>
                <div className={styles.miniAvatar}>
                    <Image 
                        src={persona.avatar.mainImage} 
                        alt={persona.personalData.name}
                        width={40}
                        height={40}
                    />
                </div>
                <div className={styles.headerInfo}>
                    <h1>{persona.personalData.name}</h1>
                    <span>Profesor {persona.personalData.profession}</span>
                </div>
            </div>
            
            <Link href="/" className={styles.headerBackButton}>
                Volver
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
            </Link>
        </header>

        <div className={styles.columnsWrapper}>
            {/* Center Column: Chat Interface */}
            <section className={styles.centerColumn}>
                <Chat persona={persona} />
            </section>

            {/* Right Column: Future Modules Placeholder */}
            <aside className={styles.rightColumn}>
                <div className={styles.placeholder}>
                    {/* Space for future features */}
                </div>
            </aside>
        </div>
      </div>
    </main>
  );
}
