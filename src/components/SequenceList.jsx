import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Table, Button, 
  Spinner, Alert, Badge
} from 'react-bootstrap';
import { PlusCircle, PencilSquare, Trash } from 'react-bootstrap-icons';
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
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading sequences...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="d-flex justify-content-between align-items-center">
        <span>{error}</span>
        <Button variant="outline-danger" size="sm" onClick={fetchSequences}>
          Try Again
        </Button>
      </Alert>
    );
  }

  return (
    <Container className="sequence-list">
      <Card className="shadow-sm">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col>
              <h2 className="h4 mb-0">Email Sequences</h2>
            </Col>
            <Col xs="auto">
              <Button 
                as={Link} 
                to="/builder" 
                variant="primary"
                className="d-flex align-items-center"
              >
                <PlusCircle className="me-2" />
                Create New Sequence
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {sequences.length === 0 ? (
            <Alert variant="info">
              <p className="mb-0">No sequences found. Create your first email sequence to get started!</p>
            </Alert>
          ) : (
            <Table hover responsive className="mb-0">
              <thead>
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
                      <Link 
                        to={`/builder/${sequence._id}`} 
                        className="fw-bold text-decoration-none"
                      >
                        {sequence.name}
                      </Link>
                    </td>
                    <td>{sequence.description || '-'}</td>
                    <td>{formatDate(sequence.createdAt)}</td>
                    <td>{formatDate(sequence.updatedAt)}</td>
                    <td>
                      <Badge bg={sequence.isActive ? 'success' : 'secondary'}>
                        {sequence.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <Button 
                        as={Link} 
                        to={`/builder/${sequence._id}`} 
                        variant="outline-primary" 
                        size="sm"
                        className="me-2 d-inline-flex align-items-center"
                      >
                        <PencilSquare className="me-1" /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(sequence._id)}
                        className="d-inline-flex align-items-center"
                      >
                        <Trash className="me-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SequenceList; 