import EmailNode from './EmailNode';
import DelayNode from './DelayNode';
import LeadSourceNode from './LeadSourceNode';

// Node type registry
export const nodeTypes = {
  emailNode: EmailNode,
  delayNode: DelayNode,
  leadSourceNode: LeadSourceNode
};

// Function to create initial nodes based on node type
export const createNode = (type, position) => {
  const id = `${type}_${Date.now()}`;
  let nodeData = { id, type, position };
  
  switch (type) {
    case 'emailNode':
      nodeData.data = {
        subject: '',
        body: '',
      };
      break;
    
    case 'delayNode':
      nodeData.data = {
        delaySeconds: 3600, // Default 1 hour
      };
      break;
    
    case 'leadSourceNode':
      nodeData.data = {
        sourceName: 'New Lead Source',
      };
      break;
    
    default:
      nodeData.data = {};
  }
  
  return nodeData;
};

// Function to get node label by type
export const getNodeLabel = (type) => {
  switch (type) {
    case 'emailNode':
      return '📧 Email';
    case 'delayNode':
      return '⏱️ Wait';
    case 'leadSourceNode':
      return '👥 Lead Source';
    default:
      return 'Node';
  }
}; 