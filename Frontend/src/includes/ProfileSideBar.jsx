import React, { useState } from 'react';
import { Nav, Modal, Button } from 'react-bootstrap';
import { FaUserClock, FaClipboardCheck, FaTrophy, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../css/Sidebar.css';

const ProfileSidebar = () => {
  const { logout, user } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      <Nav className="custom-sidebar"> 
        
        <Nav.Item>       
          <LinkContainer to="/">
            <Nav.Link>
              <FaArrowLeft className="nav-icon" /> 
              <span className="back-btn">Back</span>
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
          <Nav.Link onClick={() => setShowLogoutModal(true)} className="logout-link">
            <FaSignOutAlt className="nav-icon" />
            <span className="nav-text">Log Out</span>
          </Nav.Link>
        </Nav.Item>

      </Nav>

      {/* LOGOUT CONFIRM MODAL */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileSidebar;
