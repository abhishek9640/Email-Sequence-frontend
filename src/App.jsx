import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Login  from './components/auth/Login';
import  Register  from './components/auth/Register';
import  Profile  from './components/auth/Profile';
import './App.css';

import Navbar from './components/Navbar';
import SequenceBuilder from './components/SequenceBuilder';
import SequenceList from './components/SequenceList';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1 py-3">
            <Routes>
              <Route path="/" element={<SequenceList />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/builder" element={<SequenceBuilder />} />
              <Route path="/builder/:id" element={<SequenceBuilder />} />
            </Routes>
          </main>
          <footer className="bg-light py-3 mt-auto">
            <div className="container text-center">
              <p className="text-muted mb-0">
                Email Marketing Sequence Builder &copy; {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
