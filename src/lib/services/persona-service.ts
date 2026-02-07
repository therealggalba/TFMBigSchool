import { db } from '../db';
import { Persona, PersonaSchema, KnowledgeSource } from '../schemas/persona';

export const PersonaService = {
  async getAllPersonas(): Promise<Persona[]> {
    return await db.personas.toArray();
  },

  async getPersonaById(id: string): Promise<Persona | undefined> {
    return await db.personas.get(id);
  },

  async addPersona(persona: Persona): Promise<string> {
    // Validate with Zod before adding
    const validated = PersonaSchema.parse(persona);
    return await db.personas.add(validated);
  },

  async updatePersona(id: string, persona: Partial<Persona>): Promise<number> {
    return await db.personas.update(id, persona);
  },

  async deletePersona(id: string): Promise<void> {
    await db.personas.delete(id);
    // Also delete associated knowledge sources
    await db.knowledgeSources.where('personaId').equals(id).delete();
  },

  async getKnowledgeSources(personaId: string): Promise<KnowledgeSource[]> {
    return await db.knowledgeSources.where('personaId').equals(personaId).toArray();
  },

  async addKnowledgeSource(source: KnowledgeSource): Promise<string> {
    return await db.knowledgeSources.add(source);
  },

  async seedDatabase(seedData: Persona, knowledgeSources: Partial<KnowledgeSource>[]): Promise<void> {
    // Check for ALL personas with the same name to identify duplicates
    const matches = await db.personas
      .where('personalData.name')
      .equals(seedData.personalData.name)
      .toArray();

    let personaId: string | number;

    if (matches.length > 0) {
      // Use the first match as the primary record
      const primary = matches[0];
      personaId = primary.id!;
      
      // Update the primary record with new seed data
      await db.personas.update(personaId, seedData);

      // Aggressive clean up of ANY other persona with the same name
      if (matches.length > 1) {
        console.log(`[PersonaService] Se encontraron ${matches.length} duplicados para ${seedData.personalData.name}. Limpiando...`);
        const duplicates = matches.slice(1);
        for (const duplicate of duplicates) {
          if (duplicate.id) {
            await db.personas.delete(duplicate.id);
            // Also clean their knowledge sources
            await db.knowledgeSources.where('personaId').equals(duplicate.id.toString()).delete();
          }
        }
      }
    } else {
      // Add new if no matches found
      personaId = await this.addPersona(seedData);
    }

    // Handle knowledge sources (simple approach: sync if empty or just add if not present)
    const sourceCount = await db.knowledgeSources.where('personaId').equals(personaId.toString()).count();
    if (sourceCount === 0) {
      for (const source of knowledgeSources) {
        await this.addKnowledgeSource({
          ...(source as KnowledgeSource),
          personaId: personaId.toString(),
          createdAt: new Date()
        });
      }
    }
  }
};
