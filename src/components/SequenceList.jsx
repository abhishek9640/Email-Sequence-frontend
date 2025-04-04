import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sequenceApi } from '../services/api';

const SequenceList = () => {
  const [sequences, setSequences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all sequences on component mount
  useEffect(() => {
    fetchSequences();
  }, []);

  // Function to fetch sequences
  const fetchSequences = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await sequenceApi.getSequences();
      setSequences(response.data);
    } catch (error) {
      console.error('Error fetching sequences:', error);
      setError('Failed to load sequences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a sequence
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sequence?')) {
      try {
        await sequenceApi.deleteSequence(id);
        // Refresh the sequences list
        fetchSequences();
      } catch (error) {
        console.error('Error deleting sequence:', error);
        alert('Failed to delete the sequence. Please try again.');
      }
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading sequences...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
        <button
          className="btn btn-outline-danger btn-sm ms-3"
          onClick={fetchSequences}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="sequence-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Email Sequences</h2>
        <Link to="/builder" className="btn btn-primary">
          Create New Sequence
        </Link>
      </div>

      {sequences.length === 0 ? (
        <div className="alert alert-info">
          <p className="mb-0">No sequences found. Create your first email sequence to get started!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sequences.map((sequence) => (
                <tr key={sequence._id}>
                  <td>
                    <Link to={`/builder/${sequence._id}`} className="fw-bold text-decoration-none">
                      {sequence.name}
                    </Link>
                  </td>
                  <td>{sequence.description || '-'}</td>
                  <td>{formatDate(sequence.createdAt)}</td>
                  <td>{formatDate(sequence.updatedAt)}</td>
                  <td>
                    <span className={`badge bg-${sequence.isActive ? 'success' : 'secondary'}`}>
                      {sequence.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="text-end">
                    <Link to={`/builder/${sequence._id}`} className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(sequence._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SequenceList; 