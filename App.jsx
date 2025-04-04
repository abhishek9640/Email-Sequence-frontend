import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SequenceBuilder from './components/SequenceBuilder';
import SequenceList from './components/SequenceList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<SequenceList />} />
            <Route path="/builder" element={<SequenceBuilder />} />
            <Route path="/builder/:id" element={<SequenceBuilder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
