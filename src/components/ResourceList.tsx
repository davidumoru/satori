import React from 'react';
import { useRoadmapStore } from '../store/roadmapStore';
import { Video, BookOpen, Code, CheckCircle } from 'lucide-react';

export function ResourceList() {
  const { roadmapNodes, toggleNodeCompletion } = useRoadmapStore();

  if (!roadmapNodes.length) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      {roadmapNodes.map((node) => (
        <div
          key={node.id}
          className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">{node.title}</h3>
            <button
              onClick={() => toggleNodeCompletion(node.id)}
              className={`p-2 rounded-full transition-colors ${
                node.completed
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <CheckCircle className="w-6 h-6" />
            </button>
          </div>

          <p className="mt-2 text-gray-600">{node.description}</p>

          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
            <span>Estimated: {node.estimatedHours}h</span>
            <span>Difficulty: {'★'.repeat(node.difficulty)}</span>
          </div>

          <div className="mt-4 space-y-3">
            {node.resources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {resource.type === 'video' && <Video className="w-5 h-5 text-blue-500 mr-2" />}
                {resource.type === 'article' && <BookOpen className="w-5 h-5 text-green-500 mr-2" />}
                {resource.type === 'interactive' && <Code className="w-5 h-5 text-purple-500 mr-2" />}
                <span className="text-gray-700">{resource.title}</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}