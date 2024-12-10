import React, { useMemo } from 'react';
import ReactFlow, { 
  Node, 
  Edge,
  Background,
  Controls,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useRoadmapStore } from '../store/roadmapStore';
import { Clock, BookOpen, CheckCircle2 } from 'lucide-react';

// Custom node component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RoadmapNode({ data }: { data: any }) {
  return (
    <div className={`w-[280px] rounded-xl border-2 shadow-lg transition-all duration-300 group 
      ${data.completed 
        ? 'bg-green-50 border-green-300 shadow-green-100' 
        : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-blue-50'
      }`}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!bg-gray-300 !w-3 !h-3" 
      />
      
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">{data.title}</h3>
          {data.completed && (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {data.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{data.estimatedHours}h</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{data.resources.length} resources</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-500">
              {'★'.repeat(data.difficulty)}
              {'☆'.repeat(3 - data.difficulty)}
            </span>
          </div>
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="!bg-gray-300 !w-3 !h-3" 
      />
    </div>
  );
}

const nodeTypes = {
  roadmapNode: RoadmapNode,
};

export function RoadmapVisualization() {
  const roadmapNodes = useRoadmapStore((state) => state.roadmapNodes);

  const { nodes, edges } = useMemo(() => {
    const flowNodes: Node[] = roadmapNodes.map((node, index) => ({
      id: node.id,
      type: 'roadmapNode',
      data: node,
      position: { x: index * 320, y: 0 },
    }));

    const flowEdges: Edge[] = roadmapNodes.slice(0, -1).map((node, index) => ({
      id: `${node.id}-${roadmapNodes[index + 1].id}`,
      source: node.id,
      target: roadmapNodes[index + 1].id,
      type: 'smoothstep',
      style: { 
        strokeWidth: 2, 
        stroke: '#94a3b8',
      },
      animated: true,
    }));

    return { nodes: flowNodes, edges: flowEdges };
  }, [roadmapNodes]);

  if (!roadmapNodes.length) {
    return null;
  }

  return (
    <div className="mt-8 h-[500px] bg-white rounded-xl shadow-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
        className="bg-gray-50"
      >
        <Background color="#94a3b8" gap={16} size={1} />
        <Controls 
          className="bg-white border shadow-lg rounded-lg p-2"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}