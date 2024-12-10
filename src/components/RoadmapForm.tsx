import React from 'react';
import { useRoadmapStore } from '../store/roadmapStore';
import { useRoadmapGenerator } from '../hooks/useRoadmapGenerator';
import { ProficiencyLevel, LearningStyle } from '../types/roadmap';
import { BookOpen, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export function RoadmapForm() {
  const setFormData = useRoadmapStore((state) => state.setFormData);
  const { generateLearningRoadmap, isLoading, error } = useRoadmapGenerator();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      topic: formData.get('topic') as string,
      timeframe: formData.get('timeframe') as string,
      proficiencyLevel: formData.get('proficiencyLevel') as ProficiencyLevel,
      priorKnowledge: formData.get('priorKnowledge') as string,
      learningStyle: formData.get('learningStyle') as LearningStyle,
      weeklyHours: Number(formData.get('weeklyHours')),
    };

    setFormData(data);
    await generateLearningRoadmap(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center space-x-2 mb-8">
        <BookOpen className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Create Your Learning Roadmap</h2>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            What do you want to learn?
          </label>
          <input
            type="text"
            name="topic"
            id="topic"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., React Development, Machine Learning"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">
              Target Timeframe
            </label>
            <select
              name="timeframe"
              id="timeframe"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="1month">1 Month</option>
              <option value="3months">3 Months</option>
              <option value="6months">6 Months</option>
              <option value="1year">1 Year</option>
            </select>
          </div>

          <div>
            <label htmlFor="proficiencyLevel" className="block text-sm font-medium text-gray-700">
              Current Proficiency Level
            </label>
            <select
              name="proficiencyLevel"
              id="proficiencyLevel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="priorKnowledge" className="block text-sm font-medium text-gray-700">
            Prior Knowledge or Experience
          </label>
          <textarea
            name="priorKnowledge"
            id="priorKnowledge"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Describe your relevant background..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="learningStyle" className="block text-sm font-medium text-gray-700">
              Preferred Learning Style
            </label>
            <select
              name="learningStyle"
              id="learningStyle"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="video">Video</option>
              <option value="text">Text</option>
              <option value="interactive">Interactive</option>
            </select>
          </div>

          <div>
            <label htmlFor="weeklyHours" className="block text-sm font-medium text-gray-700">
              Weekly Time Commitment (hours)
            </label>
            <input
              type="number"
              name="weeklyHours"
              id="weeklyHours"
              min="1"
              max="168"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={clsx(
            "inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Roadmap'
          )}
        </button>
      </div>
    </form>
  );
}