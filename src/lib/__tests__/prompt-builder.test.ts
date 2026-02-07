import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from '../prompt-builder';
import { Persona } from '../schemas/persona';

describe('prompt-builder', () => {
  const mockPersona: Persona = {
    id: 'nadal',
    personalData: {
      name: 'Rafael Nadal',
      profession: 'Tenista Profesional',
      biography: 'Uno de los mejores tenistas de la historia.',
      age: 39,
      location: 'Mallorca, España'
    },
    personality: {
      writtenAccent: 'Español de España, humilde y resiliente',
      expressions: ['¡Vamos!', 'Paso a paso'],
      traits: ['Resiliencia', 'Humildad'],
      tone: 'Inspirador'
    },
    knowledge: {
      expertise: ['Tenis', 'Deporte'],
      technicalKnowledge: 'Táctica de tierra batida, técnica de drive',
      personalExperience: 'Ganador de 22 Grand Slams'
    },
    avatar: {
      mainImage: '/nadal.jpg',
      emotions: { neutral: '/neutral.mp4' }
    },
    behavior: {
      focusTopics: ['Tenis', 'Mallorca'],
      ignoreTopicsBehavior: 'Emular desconocimiento de forma natural',
      generalCultureLevel: 'Media-alta'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it('should include the persona name and profession', () => {
    const prompt = buildSystemPrompt(mockPersona);
    expect(prompt).toContain('Rafael Nadal');
    expect(prompt).toContain('Tenista Profesional');
  });

  it('should include behavioral rules', () => {
    const prompt = buildSystemPrompt(mockPersona);
    expect(prompt).toContain('Tenis, Mallorca');
    expect(prompt).toContain('Emular desconocimiento de forma natural');
  });

  it('should include critical instructions for natural ignorance', () => {
    const prompt = buildSystemPrompt(mockPersona);
    expect(prompt).toContain('emula desconocimiento de forma NATURAL');
    expect(prompt).toContain('No confirmes nunca que eres un programa');
  });

  it('should explicitly forbid text-based emotions', () => {
    const prompt = buildSystemPrompt(mockPersona);
    expect(prompt).toContain('PROHIBICIÓN ABSOLUTA DE ASTERISCOS');
    expect(prompt).toContain('*sonríe*');
  });

  it('should include strict zero-hallucination policy', () => {
    const prompt = buildSystemPrompt(mockPersona);
    expect(prompt).toContain('POLÍTICA DE ALUCINACIÓN CERO');
    expect(prompt).toContain('No inventes datos');
    expect(prompt).toContain('verificación interna');
  });
});
