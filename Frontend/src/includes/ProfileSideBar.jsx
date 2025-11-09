import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUser, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../css/Sidebar.css';

const ProfileSidebar = () => {
  const { logout } = useAuth();

  return (
    
    
    <Nav className="d-none d-md-block bg-light sidebar flex-column ">     
    
      <Nav.Item>       
        <LinkContainer to="/MyAchievement">
          <Nav.Link >
            <FaTachometerAlt className="me-2" /> My Achievements
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
     
      <Nav.Item>
        <Nav.Link onClick={logout} className="logout-link">
          <FaSignOutAlt className="me-2" />Log Out
        </Nav.Link>
      </Nav.Item>
    </Nav>
   
   
  );
};

export default ProfileSidebar;