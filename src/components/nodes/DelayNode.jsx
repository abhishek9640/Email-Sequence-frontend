import React from 'react';
import { Handle, Position } from 'reactflow';

const DelayNode = ({ data, isConnectable }) => {
  // Function to format delay time in a human-readable format
  const formatDelay = (seconds) => {
    if (!seconds) return 'No delay set';
    
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="card" style={{ width: '200px' }}>
      <div className="card-header bg-warning text-dark d-flex align-items-center">
        <div>⏱️ Wait</div>
      </div>
      
      <div className="card-body">
        <div className="mb-3 text-center">
          <strong>{formatDelay(data.delaySeconds)}</strong>
        </div>
        
        {data.onEdit && (
          <button 
            className="btn btn-sm btn-outline-primary" 
            onClick={data.onEdit}
            style={{ width: '100%' }}
          >
            Edit Delay
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

export default DelayNode; 