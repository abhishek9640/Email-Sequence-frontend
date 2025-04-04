import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const EmailNode = ({ data, isConnectable }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card" style={{ minWidth: '250px', maxWidth: '300px' }}>
      <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <div>📧 Email</div>
        <button 
          className="btn btn-sm btn-light" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '▲' : '▼'}
        </button>
      </div>
      
      <div className="card-body">
        <div className="mb-3">
          <strong>Subject:</strong>
          <div className="form-control form-control-sm bg-light">
            {data.subject || 'No subject'}
          </div>
        </div>
        
        {expanded && (
          <div className="mb-3">
            <strong>Body:</strong>
            <div 
              className="form-control form-control-sm bg-light" 
              style={{ height: '100px', overflow: 'auto' }}
            >
              {data.body || 'No content'}
            </div>
          </div>
        )}
        
        {data.onEdit && (
          <button 
            className="btn btn-sm btn-outline-primary" 
            onClick={data.onEdit}
            style={{ width: '100%' }}
          >
            Edit Email
          </button>
        )}
      </div>
      
      {/* Input handle (top) */}
      <Handle
        type="target"
        position={Position.Top}
        id="in"
        isConnectable={isConnectable}
        style={{ background: '#555' }}
      />
      
      {/* Output handle (bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="out"
        isConnectable={isConnectable}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default EmailNode; 