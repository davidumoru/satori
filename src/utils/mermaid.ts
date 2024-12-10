import mermaid from 'mermaid';
import type { RoadmapNode } from '../types/roadmap';

// Initialize mermaid configuration
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  flowchart: {
    curve: 'basis',
  },
});

export async function renderMermaidDiagram(
  elementId: string,
  nodes: RoadmapNode[]
): Promise<{ svg: string }> {
  const definition = generateMermaidDefinition(nodes);
  return mermaid.render(elementId, definition);
}

function generateMermaidDefinition(nodes: RoadmapNode[]): string {
  let definition = 'graph LR\n';

  nodes.forEach((node, index) => {
    const nextNode = nodes[index + 1];
    if (nextNode) {
      definition += `  ${node.id}[${node.title}] --> ${nextNode.id}[${nextNode.title}]\n`;
    }
    
    const style = node.completed ? 'fill:#4ade80' : 'fill:#fff';
    definition += `  style ${node.id} ${style}\n`;
  });

  return definition;
}