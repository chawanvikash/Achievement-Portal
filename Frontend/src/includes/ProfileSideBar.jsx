import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUser, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../css/Sidebar.css';

const ProfileSidebar = () => {
  const { logout,user } = useAuth();

  return (
    
    
    <Nav className="d-none d-md-block bg-light sidebar flex-column ">  
    {user.role==="staff" ? 
      <div>
        <Nav.Item>       
        <LinkContainer to="/pendingUsers">
          <Nav.Link >
            <FaTachometerAlt className="me-2" /> Pending-Users
          </Nav.Link>
        </LinkContainer>
        </Nav.Item> 

        <Nav.Item>       
        <LinkContainer to="/pendingAcheivements">
          <Nav.Link >
            <FaTachometerAlt className="me-2" /> Pending-Achievements
          </Nav.Link>
        </LinkContainer>
        </Nav.Item> 
      </div> : 
      <div>
      <Nav.Item>       
        <LinkContainer to="/MyAchievement">
          <Nav.Link >
            <FaTachometerAlt className="me-2" /> My Achievements
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      </div>}   
    
      
     
      <Nav.Item>
        <Nav.Link onClick={logout} className="logout-link">
          <FaSignOutAlt className="me-2" />Log Out
        </Nav.Link>
      </Nav.Item>
    </Nav>
   
   
  );
};

export default ProfileSidebar;