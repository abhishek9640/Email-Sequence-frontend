import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Container, Row, Col, Form, Button, Card, 
  Toast, ToastContainer, Spinner 
} from 'react-bootstrap';
import { Save, Play } from 'react-bootstrap-icons';

import { nodeTypes, createNode } from './nodes/index.jsx';
import { sequenceApi } from '../services/api';
import NodePanel from './NodePanel.jsx';
import EmailForm from './forms/EmailForm.jsx';
import DelayForm from './forms/DelayForm.jsx';
import LeadSourceForm from './forms/LeadSourceForm.jsx';
import RunSequenceForm from './forms/RunSequenceForm.jsx';

const SequenceBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  // State for sequence
  const [sequence, setSequence] = useState({
    name: 'New Sequence',
    description: '',
    nodes: [],
    edges: [],
    isActive: true
  });

  // State for form modals
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showDelayForm, setShowDelayForm] = useState(false);
  const [showLeadSourceForm, setShowLeadSourceForm] = useState(false);
  const [showRunForm, setShowRunForm] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);
  
  // State for saving status
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Load sequence if id is provided
  useEffect(() => {
    if (id) {
      fetchSequence(id);
    }
  }, [id]);

  // Effect to show toast when save message changes
  useEffect(() => {
    if (saveMessage) {
      setShowToast(true);
    }
  }, [saveMessage]);

  // Fetch sequence by id
  const fetchSequence = async (sequenceId) => {
    try {
      const response = await sequenceApi.getSequence(sequenceId);
      setSequence(response.data);
    } catch (error) {
      console.error('Error fetching sequence:', error);
      setSaveMessage('Failed to load the sequence. Please try again.');
      setShowToast(true);
    }
  };

  // Save sequence
  const saveSequence = async () => {
    try {
      setIsSaving(true);
      setSaveMessage('');
      
      // Update sequence with current nodes and edges
      const updatedSequence = {
        ...sequence,
        nodes: sequence.nodes,
        edges: sequence.edges
      };
      
      let response;
      
      if (id) {
        // Update existing sequence
        response = await sequenceApi.updateSequence(id, updatedSequence);
      } else {
        // Create new sequence
        response = await sequenceApi.createSequence(updatedSequence);
        // If successful, navigate to the sequence editor with the new ID
        if (response.data && response.data.sequence && response.data.sequence._id) {
          navigate(`/builder/${response.data.sequence._id}`);
        }
      }
      
      setSaveMessage('Sequence saved successfully!');
    } catch (error) {
      console.error('Error saving sequence:', error);
      setSaveMessage('Failed to save sequence. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Run sequence
  const handleRunSequence = async (leadData) => {
    try {
      if (!id) {
        setSaveMessage('Please save the sequence first before running it.');
        setShowToast(true);
        return;
      }
      
      await sequenceApi.runSequence(id, leadData);
      setSaveMessage('Sequence started for lead: ' + leadData.leadEmail);
      setShowToast(true);
      setShowRunForm(false);
    } catch (error) {
      console.error('Error running sequence:', error);
      setSaveMessage('Failed to run the sequence. Please try again.');
      setShowToast(true);
    }
  };

  // Node drag over handler
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Node drop handler
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      
      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      const newNode = createNode(type, position);
      
      setSequence((prevState) => ({
        ...prevState,
        nodes: [...prevState.nodes, newNode],
      }));
    },
    [reactFlowInstance]
  );

  // Node change handler
  const onNodesChange = useCallback(
    (changes) => {
      setSequence((prevState) => ({
        ...prevState,
        nodes: applyNodeChanges(changes, prevState.nodes),
      }));
    },
    []
  );

  // Edge change handler
  const onEdgesChange = useCallback(
    (changes) => {
      setSequence((prevState) => ({
        ...prevState,
        edges: applyEdgeChanges(changes, prevState.edges),
      }));
    },
    []
  );

  // Edge connect handler
  const onConnect = useCallback(
    (connection) => {
      setSequence((prevState) => ({
        ...prevState,
        edges: addEdge(
          {
            ...connection,
            id: `e${connection.source}-${connection.target}`,
            animated: true
          },
          prevState.edges
        ),
      }));
    },
    []
  );

  // Node click handler
  const onNodeClick = useCallback(
    (event, node) => {
      setCurrentNode(node);
      
      // Open the appropriate form based on node type
      switch (node.type) {
        case 'emailNode':
          setShowEmailForm(true);
          break;
        case 'delayNode':
          setShowDelayForm(true);
          break;
        case 'leadSourceNode':
          setShowLeadSourceForm(true);
          break;
        default:
          break;
      }
    },
    []
  );

  // Handle node data update
  const updateNodeData = useCallback(
    (nodeId, newData) => {
      setSequence((prevState) => ({
        ...prevState,
        nodes: prevState.nodes.map((node) => 
          node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
        ),
      }));
    },
    []
  );

  // Handle sequence name change
  const handleNameChange = (e) => {
    setSequence((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  // Handle sequence description change
  const handleDescriptionChange = (e) => {
    setSequence((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  return (
    <Container fluid className="sequence-builder px-lg-4">
      <Row>
        <Col md={3} lg={3} xl={2} className="mb-3 mb-md-0">
          <NodePanel />
        </Col>
        
        <Col md={9} lg={9} xl={10}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={7}>
                  <Form.Group className="mb-3 mb-md-0">
                    <Form.Control
                      type="text"
                      value={sequence.name}
                      onChange={handleNameChange}
                      placeholder="Sequence Name"
                      className="fw-bold form-control-lg"
                    />
                    <Form.Control
                      as="textarea"
                      value={sequence.description}
                      onChange={handleDescriptionChange}
                      placeholder="Description (optional)"
                      className="mt-2"
                      rows={2}
                    />
                  </Form.Group>
                </Col>
                <Col md={5} className="text-md-end">
                  <Button
                    variant="primary"
                    onClick={saveSequence}
                    disabled={isSaving}
                    className="me-2 d-inline-flex align-items-center"
                  >
                    {isSaving ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="me-2" />
                        Save Sequence
                      </>
                    )}
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => setShowRunForm(true)}
                    className="d-inline-flex align-items-center"
                  >
                    <Play className="me-2" />
                    Run Sequence
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm" style={{ height: 'calc(100vh - 220px)', minHeight: '500px' }}>
            <Card.Body className="p-0">
              <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: '100%' }}>
                <ReactFlowProvider>
                  <ReactFlow
                    nodes={sequence.nodes}
                    edges={sequence.edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodeClick={onNodeClick}
                    nodeTypes={nodeTypes}
                    fitView
                  >
                    <Controls />
                    <Background color="#f8f9fa" gap={16} />
                  </ReactFlow>
                </ReactFlowProvider>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Toast notifications */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{saveMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      
      {/* Form Modals */}
      {showEmailForm && currentNode && (
        <EmailForm
          show={showEmailForm}
          onHide={() => setShowEmailForm(false)}
          node={currentNode}
          updateNodeData={updateNodeData}
        />
      )}
      
      {showDelayForm && currentNode && (
        <DelayForm
          show={showDelayForm}
          onHide={() => setShowDelayForm(false)}
          node={currentNode}
          updateNodeData={updateNodeData}
        />
      )}
      
      {showLeadSourceForm && currentNode && (
        <LeadSourceForm
          show={showLeadSourceForm}
          onHide={() => setShowLeadSourceForm(false)}
          node={currentNode}
          updateNodeData={updateNodeData}
        />
      )}
      
      {showRunForm && (
        <RunSequenceForm
          show={showRunForm}
          onHide={() => setShowRunForm(false)}
          onSubmit={handleRunSequence}
        />
      )}
    </Container>
  );
};

export default SequenceBuilder; 