import React, { useState, useEffect } from 'react';

const LeadSourceForm = ({ node, onClose, onSave }) => {
  const [sourceName, setSourceName] = useState('');
  
  useEffect(() => {
    if (node && node.data) {
      setSourceName(node.data.sourceName || '');
    }
  }, [node]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ sourceName });
  };
  
  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Edit Lead Source</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="sourceName" className="form-label">Source Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="sourceName"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  placeholder="Enter lead source name"
                  required
                />
                <small className="text-muted">
                  Examples: Website Signup, Demo Request, Newsletter
                </small>
              </div>
            </div>
            
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadSourceForm; 