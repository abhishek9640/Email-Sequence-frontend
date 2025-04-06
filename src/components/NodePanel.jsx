import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { getNodeLabel } from './nodes/index.jsx';

const NodePanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeTypes = [
    { id: 'leadSourceNode', color: 'success', icon: '👥', description: 'Starting point for leads' },
    { id: 'emailNode', color: 'info', icon: '📧', description: 'Send an email to leads' },
    { id: 'delayNode', color: 'warning', icon: '⏱️', description: 'Wait before next action' },
  ];

  return (
    <div className="node-panel">
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Node Types</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-muted mb-3">Drag and drop nodes onto the canvas</p>
          
          <div className="node-palette">
            {nodeTypes.map((type) => (
              <div
                key={type.id}
                className={`node-item bg-${type.color} text-${type.color === 'warning' ? 'dark' : 'white'} mb-3`}
                draggable
                onDragStart={(e) => onDragStart(e, type.id)}
                style={{ 
                  padding: '12px', 
                  borderRadius: '8px',
                  cursor: 'grab',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="d-flex align-items-center mb-1">
                  <span className="me-2" style={{ fontSize: '1.2rem' }}>{type.icon}</span>
                  <span className="fw-bold">{getNodeLabel(type.id)}</span>
                </div>
                <small>{type.description}</small>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
      
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Instructions</h5>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex align-items-center">
            <span className="me-2">1.</span> Drag nodes onto the canvas
          </ListGroup.Item>
          <ListGroup.Item className="d-flex align-items-center">
            <span className="me-2">2.</span> Connect nodes by dragging from one handle to another
          </ListGroup.Item>
          <ListGroup.Item className="d-flex align-items-center">
            <span className="me-2">3.</span> Click on a node to edit its properties
          </ListGroup.Item>
          <ListGroup.Item className="d-flex align-items-center">
            <span className="me-2">4.</span> Save your sequence when finished
          </ListGroup.Item>
          <ListGroup.Item className="d-flex align-items-center">
            <span className="me-2">5.</span> Run your sequence with leads
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default NodePanel; 