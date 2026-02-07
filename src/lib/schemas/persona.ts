import { z } from "zod";

export const KnowledgeSourceSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  personaId: z.union([z.string(), z.number()]),
  type: z.enum(["link", "document"]),
  title: z.string(),
  url: z.string().url().optional(),
  content: z.string().optional(), // For text from documents
  createdAt: z.date().default(() => new Date()),
});

export const PersonaSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  personalData: z.object({
    name: z.string(),
    profession: z.string(),
    age: z.number().optional(),
    location: z.string().optional(),
    biography: z.string(),
  }),
  personality: z.object({
    writtenAccent: z.string(),
    expressions: z.array(z.string()),
    traits: z.array(z.string()),
    tone: z.string(),
  }),
  knowledge: z.object({
    expertise: z.array(z.string()),
    technicalKnowledge: z.string(),
    personalExperience: z.string(),
  }),
  avatar: z.object({
    mainImage: z.string(),
    emotions: z.record(z.string(), z.string()), // emotion -> image/video url
  }),
  behavior: z.object({
    focusTopics: z.array(z.string()),
    ignoreTopicsBehavior: z.string(),
    generalCultureLevel: z.string(),
  }).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type KnowledgeSource = z.infer<typeof KnowledgeSourceSchema>;
export type Persona = z.infer<typeof PersonaSchema>;
