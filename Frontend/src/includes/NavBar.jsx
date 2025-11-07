import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../css/Achievement.css"
import React from 'react';
import { Link } from 'react-router-dom';
import iiestlogo from "../assets/iiest.png"


export default function NavBar(){
   return(
     <div >
        <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
          <Container >
            <Navbar.Brand as={Link} to="/"> <img src={iiestlogo} alt="iiest" className='iiest-logo' /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/events">Events</Nav.Link>
                <Nav.Link as={Link} to="/alumni">Alumni</Nav.Link>
                

                <NavDropdown title="Achievements" id="basic-nav-dropdown" >
                  <NavDropdown.Item as={Link} to="/achievements/students">Students</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/achievements/faculty">Faculties</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/achievements/alumni">Alumni</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
            </Nav> 
            <Nav>
              <Nav.Link as={Link} to="/dashboard"> <i class="fa-solid fa-circle-user" style={{color:"blue"}}></i> Profile</Nav.Link>
            </Nav>       
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
 );
}