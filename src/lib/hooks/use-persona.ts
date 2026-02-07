import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

export function usePersonas() {
  const personas = useLiveQuery(() => db.personas.toArray());
  return {
    personas: personas ?? [],
    isLoading: personas === undefined,
  };
}

export function usePersona(id: string | undefined) {
  const persona = useLiveQuery(async () => {
    if (!id) return null;
    const numericId = parseInt(id);
    const searchId = isNaN(numericId) ? id : numericId;
    return (await db.personas.get(searchId as any)) || null;
  }, [id]);

  return {
    persona: persona,
    isLoading: persona === undefined && id !== undefined,
  };
}
