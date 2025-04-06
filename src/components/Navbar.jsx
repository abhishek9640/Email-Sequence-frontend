import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BsNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <BsNavbar expand="lg" bg="primary" variant="dark" className="mb-4">
      <Container>
        <BsNavbar.Brand as={Link} to="/">Email Sequence Builder</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="navbar-nav" />
        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/">Sequences</Nav.Link>
                <Nav.Link as={Link} to="/builder">Create New</Nav.Link>
                <NavDropdown title={user?.name || 'Account'} align="end" id="navbar-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item 
                    className="text-danger" 
                    onClick={handleLogout}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar; 