import OpenAI from 'openai';
import { RoadmapFormData, RoadmapNode } from '../types/roadmap';
import { generatePrompt } from '../utils/promptGenerator';
import { validateAndTransformResponse } from '../utils/responseValidator';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateRoadmap(formData: RoadmapFormData): Promise<RoadmapNode[]> {
  try {
    const prompt = generatePrompt(formData);
    const completion = await openai.chat.completions.create({
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
    if (!response) throw new Error('No response from OpenAI');

    const parsedResponse = JSON.parse(response);
    return validateAndTransformResponse(parsedResponse.nodes);
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw new Error('Failed to generate learning roadmap');
  }
}