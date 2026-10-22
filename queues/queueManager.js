import { logger } from '../utils/logger.js';

export const resolveAndExecuteDAG = async (nodes, edges) => {
  logger.info('Starting DAG execution engine...');

  // Create adjacency list and in-degree tracking
  const inDegree = new Map();
  const graph = new Map();

  nodes.forEach((node) => {
    inDegree.set(node.id, 0);
    graph.set(node.id, []);
  });

  edges.forEach((edge) => {
    graph.get(edge.source).push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  });

  // Topological Sort Queue (Kahn's Algorithm)
  const queue = [];
  inDegree.forEach((degree, id) => {
    if (degree === 0) queue.push(id);
  });

  const executionOrder = [];
  while (queue.length > 0) {
    const currentId = queue.shift();
    executionOrder.push(currentId);

    const neighbors = graph.get(currentId) || [];
    for (const neighbor of neighbors) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (executionOrder.length !== nodes.length) {
    throw new Error('Cyclic dependency detected in Workflow Nodes!');
  }

  logger.info(`Resolved Node Execution Sequence: ${executionOrder.join(' -> ')}`);
  return executionOrder;
};