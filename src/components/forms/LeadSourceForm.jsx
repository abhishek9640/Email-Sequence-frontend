import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const LeadSourceForm = ({ node, show, onHide, updateNodeData }) => {
  const [formData, setFormData] = useState({
    sourceName: '',
    description: ''
  });

  useEffect(() => {
    if (node && node.data) {
      setFormData({
        sourceName: node.data.sourceName || '',
        description: node.data.description || ''
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
    updateNodeData(node.id, formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>Edit Lead Source</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="leadSourceName">
            <Form.Label>Source Name</Form.Label>
            <Form.Control
              type="text"
              name="sourceName"
              value={formData.sourceName}
              onChange={handleChange}
              placeholder="e.g., Website Signup, Facebook Campaign"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="leadSourceDescription">
            <Form.Label>Description (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe this lead source"
            />
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LeadSourceForm; 