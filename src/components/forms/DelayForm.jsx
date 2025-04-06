import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const DelayForm = ({ node, show, onHide, updateNodeData }) => {
  const [formData, setFormData] = useState({
    duration: 1,
    unit: 'days'
  });

  useEffect(() => {
    if (node && node.data) {
      setFormData({
        duration: node.data.duration || 1,
        unit: node.data.unit || 'days'
      });
    }
  }, [node]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'duration' ? parseInt(value, 10) || 1 : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNodeData(node.id, formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="bg-warning text-dark">
        <Modal.Title>Edit Delay</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3" controlId="delayDuration">
            <Form.Label column sm={4}>Wait for</Form.Label>
            <Col sm={8}>
              <Row>
                <Col sm={6}>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </Col>
                <Col sm={6}>
                  <Form.Select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                  </Form.Select>
                </Col>
              </Row>
            </Col>
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

export default DelayForm; 