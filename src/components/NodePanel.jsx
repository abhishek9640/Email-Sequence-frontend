import React from 'react';
import { getNodeLabel } from './nodes/index.jsx';

const NodePanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeTypes = [
    { id: 'leadSourceNode', color: 'success', icon: '👥' },
    { id: 'emailNode', color: 'info', icon: '📧' },
    { id: 'delayNode', color: 'warning', icon: '⏱️' },
  ];

  return (
    <div className="node-panel">
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Node Types</h5>
        </div>
        <div className="card-body">
          <p className="text-muted">Drag and drop nodes onto the canvas</p>
          
          <div className="node-palette">
            {nodeTypes.map((type) => (
              <div
                key={type.id}
                className={`node-item bg-${type.color} text-${type.color === 'warning' ? 'dark' : 'white'} mb-2`}
                draggable
                onDragStart={(e) => onDragStart(e, type.id)}
                style={{ 
                  padding: '10px', 
                  borderRadius: '4px',
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span className="me-2">{type.icon}</span>
                {getNodeLabel(type.id)}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Instructions</h5>
        </div>
        <div className="card-body">
          <ol className="ps-3 mb-0">
            <li className="mb-2">Drag nodes onto the canvas</li>
            <li className="mb-2">Connect nodes by dragging from one handle to another</li>
            <li className="mb-2">Click on a node to edit its properties</li>
            <li className="mb-2">Save your sequence when finished</li>
            <li>Run your sequence with leads</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default NodePanel; 