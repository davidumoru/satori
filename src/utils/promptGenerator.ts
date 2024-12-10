import { RoadmapFormData } from '../types/roadmap';

export function generatePrompt(formData: RoadmapFormData): string {
  return `
Generate a detailed learning roadmap for ${formData.topic} with the following specifications:

- Learner Profile:
  * Current level: ${formData.proficiencyLevel}
  * Prior knowledge: ${formData.priorKnowledge}
  * Preferred learning style: ${formData.learningStyle}
  * Available time: ${formData.weeklyHours} hours per week
  * Target timeframe: ${formData.timeframe}

Please provide a structured response in JSON format with the following structure:
{
  "nodes": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "estimatedHours": number,
      "difficulty": 1-3,
      "resources": [
        {
          "title": "string",
          "url": "string",
          "type": "video" | "article" | "interactive"
        }
      ],
      "completed": false
    }
  ]
}

Ensure:
1. Resources match the preferred learning style when possible
2. Total estimated hours align with weekly commitment and timeframe
3. Progressive difficulty based on current level
4. Clear prerequisites and logical progression
5. Specific, actionable learning objectives
6. High-quality, relevant resource links
`;
}