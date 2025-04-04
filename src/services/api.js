import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ;

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API for sequences
const sequenceApi = {
  // Get all sequences
  getSequences: () => api.get('/sequences'),
  
  // Get a specific sequence
  getSequence: (id) => api.get(`/sequences/${id}`),
  
  // Create a new sequence
  createSequence: (data) => api.post('/sequences', data),
  
  // Update a sequence
  updateSequence: (id, data) => api.put(`/sequences/${id}`, data),
  
  // Delete a sequence
  deleteSequence: (id) => api.delete(`/sequences/${id}`),
  
  // Run a sequence for a lead
  runSequence: (id, leadData) => api.post(`/sequences/${id}/run`, leadData)
};

// API for emails
const emailApi = {
  // Schedule a new email
  scheduleEmail: (data) => api.post('/emails/schedule', data),
  
  // Get all scheduled emails
  getEmails: () => api.get('/emails'),
  
  // Get a specific email
  getEmail: (id) => api.get(`/emails/${id}`)
};

export { sequenceApi, emailApi }; 