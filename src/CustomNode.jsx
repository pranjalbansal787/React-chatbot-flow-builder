import React from 'react';
import { Handle } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <Handle type="target" position="top" />
      <div>{data.label}</div>
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default CustomNode;
