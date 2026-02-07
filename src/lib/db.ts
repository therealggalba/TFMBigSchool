import Dexie, { type Table } from 'dexie';
import { Persona, KnowledgeSource } from './schemas/persona';

export class ChatDatabase extends Dexie {
  conversations!: Table<{
    id?: number;
    title: string;
    createdAt: Date;
  }>;

  messages!: Table<{
    id?: number;
    conversationId: number;
    role: 'user' | 'assistant';
    content: string;
    createdAt: Date;
  }>;

  personas!: Table<Persona>;
  knowledgeSources!: Table<KnowledgeSource>;

  constructor() {
    super('chatsHubDB');
    this.version(2).stores({
      conversations: '++id, title, createdAt',
      messages: '++id, conversationId, role, createdAt',
      personas: '++id, personalData.name, personalData.profession',
      knowledgeSources: '++id, personaId, type, url',
    });
  }
}

export const db = new ChatDatabase();
