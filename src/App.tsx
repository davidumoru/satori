import React from 'react';
import { RoadmapForm } from './components/RoadmapForm';
import { RoadmapVisualization } from './components/RoadmapVisualization';
import { ResourceList } from './components/ResourceList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <RoadmapForm />
        <RoadmapVisualization />
        <ResourceList />
      </div>
    </div>
  );
}

export default App;