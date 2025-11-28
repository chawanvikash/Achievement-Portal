import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DashAdminAcheivements() {
  const [achieves, setAchieves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const url = "http://localhost:8080";

  // Fetch pending posts
  useEffect(() => { 
    const fetchPosts = async () => {
      try {  
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

  // Approve Logic
  const handleApprove = async (postId) => {
    try {
      setError(null);
      setSuccessMessage(null);

      const response = await axios.put(url + `/api/admin/achievements/${postId}/approve`);
      
      // Remove the approved post from the list
      setAchieves(prevAchieves => prevAchieves.filter(post => post._id !== postId));
      
      setSuccessMessage(response.data.message);
      setTimeout(() => setSuccessMessage(null), 3000);

    } catch (err) {
      setError(err.response?.data?.error || "Failed to approve achievement.");
    }
  };

  if (loading) {
    return <Container className="text-center mt-5"><Spinner animation="border" /> <p>Loading pending achievements...</p></Container>;
  }

  return (
    <Container className="mt-4">
      {/* Back Button */}
      <div className="mb-3">
        <Link to="/dashboard">
          <Button variant='outline-secondary'>&larr; Back to Dashboard</Button>
        </Link>
      </div>

      <h2>Pending Achievement Approvals</h2>
      <p className="text-muted">Review and publish student achievements.</p>

      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      {successMessage && <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>}

      {achieves.length === 0 ? (
        <Alert variant="info">No pending achievements found.</Alert>
      ) : (
        <Row>
          {achieves.map(achieve => (             
            <Col md={12} key={achieve._id} className="mb-3">
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center bg-white">
                  <span className="fw-bold text-primary">{achieve.user.username}</span>
                  <Badge bg="secondary">{achieve.user.role}</Badge>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{achieve.title}</Card.Title>
                  <Card.Text>{achieve.body}</Card.Text>
                  <div className="d-flex justify-content-end mt-3">
                    <Button 
                      variant="success" 
                      onClick={() => handleApprove(achieve._id)}
                    >
                      Approve & Publish
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className="text-muted small">
                  Submitted on: {new Date(achieve.createdAt).toLocaleDateString()}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default DashAdminAcheivements;
