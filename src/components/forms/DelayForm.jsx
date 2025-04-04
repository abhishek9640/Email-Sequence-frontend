import React, { useState, useEffect } from 'react';

const DelayForm = ({ node, onClose, onSave }) => {
  const [delayValue, setDelayValue] = useState(1);
  const [delayUnit, setDelayUnit] = useState('hours');
  
  useEffect(() => {
    if (node && node.data && node.data.delaySeconds) {
      const seconds = node.data.delaySeconds;
      
      if (seconds % 86400 === 0) {
        setDelayValue(seconds / 86400);
        setDelayUnit('days');
      } else if (seconds % 3600 === 0) {
        setDelayValue(seconds / 3600);
        setDelayUnit('hours');
      } else if (seconds % 60 === 0) {
        setDelayValue(seconds / 60);
        setDelayUnit('minutes');
      } else {
        setDelayValue(seconds);
        setDelayUnit('seconds');
      }
    }
  }, [node]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let delaySeconds = delayValue;
    
    // Convert to seconds based on the selected unit
    switch (delayUnit) {
      case 'minutes':
        delaySeconds = delayValue * 60;
        break;
      case 'hours':
        delaySeconds = delayValue * 3600;
        break;
      case 'days':
        delaySeconds = delayValue * 86400;
        break;
      default:
        break;
    }
    
    onSave({ delaySeconds });
  };
  
  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title">Edit Delay</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Wait Duration</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={delayValue}
                    onChange={(e) => setDelayValue(Number(e.target.value))}
                    min="1"
                    required
                  />
                  <select
                    className="form-select"
                    value={delayUnit}
                    onChange={(e) => setDelayUnit(e.target.value)}
                  >
                    <option value="seconds">Seconds</option>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
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

export default DelayForm; 