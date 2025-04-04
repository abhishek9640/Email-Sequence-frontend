import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import SequenceBuilder from './components/SequenceBuilder.jsx';
import SequenceList from './components/SequenceList.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import Profile from './components/auth/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<SequenceList />} />
                <Route path="/builder" element={<SequenceBuilder />} />
                <Route path="/builder/:id" element={<SequenceBuilder />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
