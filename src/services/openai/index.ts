import { openaiClient } from './client';
import { createRoadmapPrompt } from './prompts';
import { RoadmapResponseSchema } from './types';
import { APIError, InvalidResponseError } from './errors';
import type { RoadmapFormData } from '../../types/roadmap';
import type { RoadmapNode } from '../../types/roadmap';

export async function generateRoadmap(formData: RoadmapFormData): Promise<RoadmapNode[]> {
  try {
    const prompt = createRoadmapPrompt(formData);
    
    const completion = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a specialized learning path generator. Generate detailed, structured learning roadmaps in JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    
    if (!response) {
      throw new APIError('Empty response from OpenAI');
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (error) {
      throw new InvalidResponseError('Failed to parse OpenAI response', error);
    }

    const validatedResponse = RoadmapResponseSchema.safeParse(parsedResponse);
    
    if (!validatedResponse.success) {
      throw new InvalidResponseError('Invalid response format from OpenAI', 
        validatedResponse.error);
    }

    return validatedResponse.data.nodes.map(node => ({
      ...node,
      difficulty: node.difficulty as 1 | 2 | 3
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new APIError(`Failed to generate roadmap: ${error.message}`, error);
    }
    throw new APIError('An unexpected error occurred');
  }
}