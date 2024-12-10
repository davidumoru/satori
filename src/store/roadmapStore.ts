import { create } from 'zustand';
import type { RoadmapFormData, RoadmapNode } from '../types/roadmap';

interface RoadmapStore {
  formData: RoadmapFormData | null;
  roadmapNodes: RoadmapNode[];
  setFormData: (data: RoadmapFormData) => void;
  setRoadmapNodes: (nodes: RoadmapNode[]) => void;
  toggleNodeCompletion: (nodeId: string) => void;
}

export const useRoadmapStore = create<RoadmapStore>((set) => ({
  formData: null,
  roadmapNodes: [],
  setFormData: (data) => set({ formData: data }),
  setRoadmapNodes: (nodes) => set({ roadmapNodes: nodes }),
  toggleNodeCompletion: (nodeId) =>
    set((state) => ({
      roadmapNodes: state.roadmapNodes.map((node) =>
        node.id === nodeId ? { ...node, completed: !node.completed } : node
      ),
    })),
}));