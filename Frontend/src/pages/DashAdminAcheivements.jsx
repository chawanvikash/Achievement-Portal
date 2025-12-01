import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileSidebar from '../includes/ProfileSideBar';
import HomeBtn from '../includes/HomeBtn';
// Use the same CSS as the user dashboard for consistency
import "../css/Achievement.css"; 

function DashAdminAcheivements() {
  const [achieves, setAchieves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const url = "http://localhost:8080";

  useEffect(() => { 
    const fetchPosts = async () => {
      try {  
        // Fetch all posts where isApproved is false
        const response = await axios.get(url + '/api/admin/pending-achievements');
        setAchieves(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching achievements.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts(); 
  }, []); 


  const handleApprove = async (postId) => {
    try {
      setError(null);
      setSuccessMessage(null);

      const response = await axios.put(url + `/api/admin/achievements/${postId}/approve`);
      
     
      setAchieves(prevAchieves => prevAchieves.filter(post => post._id !== postId));
      
      setSuccessMessage(response.data.message);
      

      setTimeout(() => setSuccessMessage(null), 3000);

    } catch (err) {
      setError(err.response?.data?.error || "Failed to approve achievement.");
    }
  };

  const handleReject = async (postId) => {
    if (!window.confirm("Are you sure you want to reject (delete) this achievement?")) return;

    try {
      setError(null);
      setSuccessMessage(null);

      setAchieves(prevAchieves => prevAchieves.filter(post => post._id !== postId));
      
      setSuccessMessage("Achievement rejected and removed.");
      setTimeout(() => setSuccessMessage(null), 3000);

    } catch (err) {
      setError(err.response?.data?.error || "Failed to reject achievement.");
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5" style={{marginLeft: '240px'}}>
        <Spinner animation="border" variant="primary" /> 
        <p className="mt-2">Loading pending achievements...</p>
      </Container>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <ProfileSidebar/>
      <HomeBtn/>
      
      <div style={{ marginLeft: '260px', padding: '20px', width: 'calc(100% - 260px)' }}>
        <Container fluid>


          <h2 className="mb-3 fw-bold text-dark">Pending Achievement Approvals</h2>
          <p className="text-muted mb-4">Review student submissions. Approved posts will appear on the public homepage.</p>

          {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
          {successMessage && <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>}

          {achieves.length === 0 ? (
            <Alert variant="info" className="shadow-sm">No pending achievements found. Great job!</Alert>
          ) : (
            <Col>
              {achieves.map(achieve => (             
                <Col md={12} lg={6} key={achieve._id} className="mb-4">
                  <Card className="shadow-sm h-100 border-0 achive">
                    <Card.Header className="d-flex justify-content-between align-items-center bg-white border-bottom-0 pt-3 px-3">
                      <span className="fw-bold text-primary fs-5">{achieve.user?.username || 'Unknown User'}</span>
                      <Badge bg="secondary" className="text-uppercase">{achieve.user?.role || 'Student'}</Badge>
                    </Card.Header>
                    
                    <Card.Body className="px-3 pb-3">
                      <Card.Title className="fw-bold mb-2">{achieve.title}</Card.Title>
                      <Card.Text className="text-secondary mb-3" style={{whiteSpace: 'pre-line'}}>
                        {achieve.body}
                      </Card.Text>
                      
                      <div className="d-flex justify-content-end gap-2 mt-auto pt-3 border-top">
                        
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleReject(achieve._id)}
                        >
                          Reject
                        </Button>

                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleApprove(achieve._id)}
                        >
                          Approve & Publish
                        </Button>
                      </div>
                    </Card.Body>
                    
                    <Card.Footer className="bg-light text-muted small border-top-0 rounded-bottom">
                      Submitted on: {new Date(achieve.createdAt).toLocaleDateString()}
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Col>
          )}
        </Container>
      </div>
    </div>
  );
}

export default DashAdminAcheivements;
