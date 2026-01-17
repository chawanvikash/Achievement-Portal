import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../css/Achievement.css";
import React from 'react';
import { Link } from 'react-router-dom';
import iiestlogo from "../assets/iiest.png";
import { FaUserCircle } from 'react-icons/fa'; 

export default function NavBar() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary shadow-sm" fixed='top' style={{ backgroundColor: '#ffffff', minHeight: '70px' }}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img 
              src={iiestlogo} 
              alt="iiest" 
              className='iiest-logo' 
              style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
            />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" style={{ backgroundColor: '#ffffff' }}>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              
              <NavDropdown title="Achievements" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/achievements/students">Students</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/achievements/faculty">Faculties</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/achievements/alumni">Alumni</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/achievements/Institute">Institute</NavDropdown.Item>
              </NavDropdown>
              
              <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
            </Nav>
            
            <Nav>
              <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
                <FaUserCircle size={24} color="tomato" className="me-2"/> 
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}