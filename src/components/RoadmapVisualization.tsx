import React, { useEffect, useRef } from 'react';
import { useRoadmapStore } from '../store/roadmapStore';
import { renderMermaidDiagram } from '../utils/mermaid';

export function RoadmapVisualization() {
  const roadmapNodes = useRoadmapStore((state) => state.roadmapNodes);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function updateDiagram() {
      if (!roadmapNodes.length || !containerRef.current) return;

      try {
        const { svg } = await renderMermaidDiagram('roadmap', roadmapNodes);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Failed to render roadmap:', error);
      }
    }

    updateDiagram();
  }, [roadmapNodes]);

  if (!roadmapNodes.length) {
    return null;
  }

  return (
    <div className="mt-8 p-4 bg-white rounded-xl shadow-lg overflow-x-auto">
      <div ref={containerRef} className="min-w-[800px]" />
    </div>
  );
}