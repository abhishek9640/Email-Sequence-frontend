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

  // Load sequence if id is provided
  useEffect(() => {
    if (id) {
      fetchSequence(id);
    }
  }, [id]);

  // Fetch sequence by id
  const fetchSequence = async (sequenceId) => {
    try {
      const response = await sequenceApi.getSequence(sequenceId);
      setSequence(response.data);
    } catch (error) {
      console.error('Error fetching sequence:', error);
      alert('Failed to load the sequence. Please try again.');
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
      
      // Clear save message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }
  };

  // Run sequence
  const handleRunSequence = async (leadData) => {
    try {
      if (!id) {
        alert('Please save the sequence first before running it.');
        return;
      }
      
      await sequenceApi.runSequence(id, leadData);
      alert('Sequence started for lead: ' + leadData.leadEmail);
      setShowRunForm(false);
    } catch (error) {
      console.error('Error running sequence:', error);
      alert('Failed to run the sequence. Please try again.');
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

  // Update sequence name
  const handleNameChange = (e) => {
    setSequence({
      ...sequence,
      name: e.target.value
    });
  };

  // Update sequence description
  const handleDescriptionChange = (e) => {
    setSequence({
      ...sequence,
      description: e.target.value
    });
  };

  // Update node data
  const updateNodeData = useCallback(
    (nodeId, newData) => {
      setSequence((prevState) => ({
        ...prevState,
        nodes: prevState.nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData
              }
            };
          }
          return node;
        })
      }));
    },
    []
  );

  return (
    <div className="sequence-builder">
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>{id ? 'Edit Sequence' : 'Create New Sequence'}</h2>
          <div>
            <button 
              className="btn btn-primary me-2" 
              onClick={saveSequence}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Sequence'}
            </button>
            {id && (
              <button 
                className="btn btn-success" 
                onClick={() => setShowRunForm(true)}
              >
                Run Sequence
              </button>
            )}
          </div>
        </div>
        
        {saveMessage && (
          <div className={`alert ${saveMessage.includes('Failed') ? 'alert-danger' : 'alert-success'}`}>
            {saveMessage}
          </div>
        )}
        
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="sequenceName">Name</label>
              <input
                type="text"
                id="sequenceName"
                className="form-control"
                value={sequence.name}
                onChange={handleNameChange}
                placeholder="Enter sequence name"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="sequenceDescription">Description</label>
              <input
                type="text"
                id="sequenceDescription"
                className="form-control"
                value={sequence.description || ''}
                onChange={handleDescriptionChange}
                placeholder="Enter sequence description"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-3">
          <NodePanel />
        </div>
        
        <div className="col-md-9">
          <div 
            className="react-flow-wrapper" 
            style={{ height: '70vh', border: '1px solid #ddd' }}
            ref={reactFlowWrapper}
          >
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
                <Background variant="dots" gap={12} size={1} />
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </div>
      </div>
      
      {/* Email Form Modal */}
      {showEmailForm && currentNode && (
        <EmailForm
          node={currentNode}
          onClose={() => setShowEmailForm(false)}
          onSave={(data) => {
            updateNodeData(currentNode.id, data);
            setShowEmailForm(false);
          }}
        />
      )}
      
      {/* Delay Form Modal */}
      {showDelayForm && currentNode && (
        <DelayForm
          node={currentNode}
          onClose={() => setShowDelayForm(false)}
          onSave={(data) => {
            updateNodeData(currentNode.id, data);
            setShowDelayForm(false);
          }}
        />
      )}
      
      {/* Lead Source Form Modal */}
      {showLeadSourceForm && currentNode && (
        <LeadSourceForm
          node={currentNode}
          onClose={() => setShowLeadSourceForm(false)}
          onSave={(data) => {
            updateNodeData(currentNode.id, data);
            setShowLeadSourceForm(false);
          }}
        />
      )}
      
      {/* Run Sequence Form Modal */}
      {showRunForm && (
        <RunSequenceForm
          onClose={() => setShowRunForm(false)}
          onRun={handleRunSequence}
        />
      )}
    </div>
  );
};

export default SequenceBuilder; 