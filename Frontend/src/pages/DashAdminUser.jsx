import "../css/Achievement.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Container, Row, Col, Card, Form, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileSidebar from '../includes/ProfileSideBar';
import HomeBtn from '../includes/HomeBtn';


function DashAdminUser() {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  const url="http://localhost:8080";


  useEffect(() => { 
    const fetchUsers = async () => {
      try {  
        const response = await axios.get(url + '/api/admin/pending-users');
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching users. Are you an admin?");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers(); 
  }, []); 


  const handleApprove = async (userId) => {
    try {
      setError(null); 
      setSuccessMessage(null); 

      
      const response = await axios.put(url + `/api/admin/users/${userId}/approve`);
      setSuccessMessage(response.data.message || "User approved successfully!");
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      setTimeout(() => setSuccessMessage(null), 3000);

    } catch (err) {
      setError(err.response?.data?.error || "Failed to approve user.");
    }
  };

  if (loading) {
    return <Container className="text-center mt-5"><Spinner animation="border" /> <p>Loading pending users...</p></Container>;
  }

  return (
    <div>
      <HomeBtn/>
    <Container className="mt-4">


      <h2>Pending User Approvals</h2>
      <p className="text-muted">Review and approve new account requests.</p>

     
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      
      
      {successMessage && <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>}

      {users.length === 0 ? (
        <Alert variant="info">No users found waiting for verification.</Alert>
      ) : (
        <div className="users-list">
          {users.map(user => (             
            <Card key={user._id} className="mb-3 shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{user.username}</h5>
                  <p className="mb-1 text-muted"><strong>Email:</strong> {user.email}</p>
                  <p className="mb-0"><strong>Role:</strong> <span className="text-capitalize">{user.role}</span></p>
                </div>
                <div>
                
                  <Button 
                    variant="success" 
                    onClick={() => handleApprove(user._id)}
                  >
                    Approve
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
    <ProfileSidebar/>

    </div>
  );
}

export default DashAdminUser;
