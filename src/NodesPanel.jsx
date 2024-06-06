// src/components/NodesPanel.js
import React from 'react';

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">Drag these nodes to the pane on the right.</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'customNode')} draggable>
        Text Node
      </div>
    </aside>
  );
};

export default NodesPanel;
