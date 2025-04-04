import React, { useState } from 'react';

const RunSequenceForm = ({ onClose, onRun }) => {
  const [formData, setFormData] = useState({
    leadEmail: '',
    leadName: '',
    source: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onRun(formData);
  };
  
  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Run Sequence</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <p className="alert alert-info">
                This will start the email sequence for the specified lead.
              </p>
              
              <div className="mb-3">
                <label htmlFor="leadEmail" className="form-label">Lead Email *</label>
                <input
                  type="email"
                  className="form-control"
                  id="leadEmail"
                  name="leadEmail"
                  value={formData.leadEmail}
                  onChange={handleChange}
                  placeholder="Enter lead email address"
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="leadName" className="form-label">Lead Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="leadName"
                  name="leadName"
                  value={formData.leadName}
                  onChange={handleChange}
                  placeholder="Enter lead name (optional)"
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="source" className="form-label">Source</label>
                <input
                  type="text"
                  className="form-control"
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="Where did this lead come from? (optional)"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Start Sequence
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RunSequenceForm; 