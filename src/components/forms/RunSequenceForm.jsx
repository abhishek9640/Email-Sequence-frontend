import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const RunSequenceForm = ({ show, onHide, onSubmit }) => {
  const [formData, setFormData] = useState({
    leadEmail: '',
    leadName: '',
    customFields: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCustomFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      customFields: {
        ...formData.customFields,
        [name]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>Run Sequence</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <p className="text-muted mb-3">
            Enter lead information to start this email sequence.
          </p>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="leadEmail">
                <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="email"
                  name="leadEmail"
                  value={formData.leadEmail}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="leadName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="leadName"
                  value={formData.leadName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <h6 className="mb-3 mt-4">Custom Fields (Optional)</h6>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="companyName">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  onChange={handleCustomFieldChange}
                  placeholder="Company Name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  onChange={handleCustomFieldChange}
                  placeholder="Phone Number"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Start Sequence
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RunSequenceForm; 