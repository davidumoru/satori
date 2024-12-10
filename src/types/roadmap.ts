export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced';
export type LearningStyle = 'video' | 'text' | 'interactive';

export interface RoadmapFormData {
  topic: string;
  timeframe: string;
  proficiencyLevel: ProficiencyLevel;
  priorKnowledge: string;
  learningStyle: LearningStyle;
  weeklyHours: number;
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  difficulty: 1 | 2 | 3;
  resources: Array<{
    title: string;
    url: string;
    type: 'video' | 'article' | 'interactive';
  }>;
  completed: boolean;
}