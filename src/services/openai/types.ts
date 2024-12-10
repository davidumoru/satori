import { z } from 'zod';

export const RoadmapResponseSchema = z.object({
  nodes: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    estimatedHours: z.number().positive(),
    difficulty: z.number().min(1).max(3),
    resources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      type: z.enum(['video', 'article', 'interactive'])
    })),
    completed: z.boolean()
  }))
});

export type RoadmapResponse = z.infer<typeof RoadmapResponseSchema>;