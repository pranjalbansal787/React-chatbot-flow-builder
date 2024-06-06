// src/components/SettingsPanel.js
import React, { useState, useEffect } from 'react';

const SettingsPanel = ({ node, nodes, edges, setNodes }) => {
  const [nodeName, setNodeName] = useState(node.data.label);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setNodeName(event.target.value);
  };

  const validateNodes = () => {
    // Check if all nodes have at least one incoming connection
    const unconnectedNodes = nodes.filter((n) => {
      const isConnected = edges.some((edge) => edge.target === n.id);
      return !isConnected;
    });

    if (unconnectedNodes.length > 0) {
      setError('All nodes must have at least one incoming connection.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSave = () => {
    if (validateNodes()) {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                label: nodeName,
              },
            };
          }
          return n;
        })
      );
    }
  };

  useEffect(() => {
    validateNodes();
  }, [nodes, edges]);

  return (
    <aside>
      <div>Settings Panel</div>
      <input value={nodeName} onChange={handleChange} type="text" />
      <button onClick={handleSave}>Save</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </aside>
  );
};

export default SettingsPanel;
