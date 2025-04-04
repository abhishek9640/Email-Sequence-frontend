import React from 'react';
import { Handle, Position } from 'reactflow';

const LeadSourceNode = ({ data, isConnectable }) => {
  return (
    <div className="card" style={{ width: '200px' }}>
      <div className="card-header bg-success text-white d-flex align-items-center">
        <div>👥 Lead Source</div>
      </div>
      
      <div className="card-body">
        <div className="mb-3">
          <strong>Source:</strong>
          <div className="form-control form-control-sm bg-light">
            {data.sourceName || 'Unnamed Source'}
          </div>
        </div>
        
        {data.onEdit && (
          <button 
            className="btn btn-sm btn-outline-primary" 
            onClick={data.onEdit}
            style={{ width: '100%' }}
          >
            Edit Source
          </button>
        )}
        
        {data.onAddLead && (
          <button 
            className="btn btn-sm btn-outline-success mt-2" 
            onClick={data.onAddLead}
            style={{ width: '100%' }}
          >
            Add Lead
          </button>
        )}
      </div>
      
      {/* Output handle (bottom) - only source, no target */}
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

export default LeadSourceNode; 