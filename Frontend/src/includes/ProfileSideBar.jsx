import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUser, FaCog, FaSignOutAlt, FaShoppingBag } from 'react-icons/fa';

import "../css/Sidebar.css"

const ProfileSidebar = () => {
  return (
    <Nav className="d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky"></div>
      <Nav.Item>
        <Nav.Link href="/profile">
          <FaUser /> Profile
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/orders">
          <FaShoppingBag /> Orders
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/settings">
          <FaCog /> Settings
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/logout">
          <FaSignOutAlt /> Sign out
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default ProfileSidebar;