// src/components/App.js
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import CustomNode from './CustomNode';
import { initialNodes, initialEdges } from './initialelements';
import './index.css';

const nodeTypes = {
  customNode: CustomNode,
};

const App = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onNodeClick = useCallback((_, node) => setSelectedNode(node), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      const position = reactFlowBounds
        ? {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          }
        : { x: event.clientX, y: event.clientY };

      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: { label: `Node ${nodes.length + 1}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes]
  );

  return (
    <div className="app">
      <NodesPanel />
      <div className="reactflow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {selectedNode && <SettingsPanel node={selectedNode} nodes={nodes} edges={edges} setNodes={setNodes} />}
    </div>
  );
};

export default App;
