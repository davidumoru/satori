import { z } from 'zod';
import type { RoadmapNode } from '../types/roadmap';

const ResourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  type: z.enum(['video', 'article', 'interactive'])
});

const RoadmapNodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  estimatedHours: z.number().positive(),
  difficulty: z.number().min(1).max(3),
  resources: z.array(ResourceSchema),
  completed: z.boolean()
});

export function validateAndTransformResponse(data: unknown): RoadmapNode[] {
  try {
    const schema = z.array(RoadmapNodeSchema);
    return schema.parse(data);
  } catch (error) {
    console.error('Validation error:', error);
    throw new Error('Invalid response format from API');
  }
}