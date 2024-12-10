import { useState } from 'react';
import { generateRoadmap } from '../services/openai';
import { useRoadmapStore } from '../store/roadmapStore';
import type { RoadmapFormData } from '../types/roadmap';
import { OpenAIServiceError } from '../services/openai/errors';

export function useRoadmapGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setRoadmapNodes = useRoadmapStore((state) => state.setRoadmapNodes);

  const generateLearningRoadmap = async (formData: RoadmapFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const roadmap = await generateRoadmap(formData);
      setRoadmapNodes(roadmap);
    } catch (err) {
      if (err instanceof OpenAIServiceError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(`An error occurred: ${err.message}`);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error generating roadmap:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateLearningRoadmap,
    isLoading,
    error
  };
}