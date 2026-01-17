import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUserClock, FaClipboardCheck, FaTrophy, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../css/Sidebar.css';


const ProfileSidebar = () => {
  const { logout, user } = useAuth();

  return (
    <Nav className="custom-sidebar"> 
      

      <Nav.Item>       
        <LinkContainer to="/">
          <Nav.Link>
            <FaArrowLeft className="nav-icon" /> 
            <span className="back-btn ">Back</span>
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      {user.role === "staff" && (
        <> 
          <Nav.Item>       
            <LinkContainer to="/pendingUsers">
              <Nav.Link>
                <FaUserClock className="nav-icon" /> 
                <span className="nav-text">Pending Users</span>
              </Nav.Link>
            </LinkContainer>
          </Nav.Item> 

          <Nav.Item>       
            <LinkContainer to="/pendingAcheivements">
              <Nav.Link>
                <FaClipboardCheck className="nav-icon" /> 
                <span className="nav-text">Approvals</span>
              </Nav.Link>
            </LinkContainer>
          </Nav.Item> 

          <Nav.Item>       
            <LinkContainer to="/reviews">
              <Nav.Link>
                <FaClipboardCheck className="nav-icon" /> 
                <span className="nav-text">Messages</span>
              </Nav.Link>
            </LinkContainer>
          </Nav.Item> 
        </>
      )}     
      <Nav.Item>       
        <LinkContainer to="/MyAchievement">
          <Nav.Link>
            <FaTrophy className="nav-icon" /> 
            <span className="nav-text">My Achievements</span>
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>

      
      <Nav.Item className="mt-auto-desktop">
        <Nav.Link onClick={logout} className="logout-link">
          <FaSignOutAlt className="nav-icon" />
          <span className="nav-text">Log Out</span>
        </Nav.Link>
      </Nav.Item>

    </Nav>
  );
};

export default ProfileSidebar;