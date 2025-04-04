import React, { useState, useEffect } from 'react';

const EmailForm = ({ node, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    subject: '',
    body: ''
  });

  useEffect(() => {
    if (node && node.data) {
      setFormData({
        subject: node.data.subject || '',
        body: node.data.body || ''
      });
    }
  }, [node]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">Edit Email</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter email subject"
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="body" className="form-label">Email Body</label>
                <textarea
                  className="form-control"
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Enter email content (HTML supported)"
                  required
                ></textarea>
                <small className="text-muted">
                  You can use HTML tags and inline CSS for formatting.
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

export default EmailForm; 