import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EmailForm = ({ node, show, onHide, updateNodeData }) => {
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
    updateNodeData(node.id, formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="bg-info text-white">
        <Modal.Title>Edit Email</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="emailSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter email subject"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="emailBody">
            <Form.Label>Email Body</Form.Label>
            <Form.Control
              as="textarea"
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows={6}
              placeholder="Enter email content (HTML supported)"
              required
            />
            <Form.Text className="text-muted">
              You can use HTML tags and inline CSS for formatting.
            </Form.Text>
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

export default EmailForm; 