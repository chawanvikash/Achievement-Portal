import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Badge, Spinner, Alert, Card, Modal } from 'react-bootstrap';
import { FaTrash, FaEnvelope, FaUser, FaCommentDots, FaReply } from 'react-icons/fa';
import ProfileSidebar from '../includes/ProfileSideBar'; 
import { BASE_URL } from '../helper';


function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const url =BASE_URL; 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(url + '/api/admin/reviews');
        setReviews(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(url + `/api/admin/reviews/${id}`);
        setReviews(reviews.filter(review => review._id !== id));
      } catch (err) {
        alert("Error deleting review.");
      }
    }
  };

  const handleView = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
    
      <style>
        {`
          .admin-wrapper {
            display: flex;
            min-height: 100vh;
            background-color: #f8f9fa;
          }
          
          /* DESKTOP: Content pushed right to make room for Sidebar */
          .admin-content {
            flex-grow: 1;
            margin-left: 260px; /* Must match Sidebar width */
            padding: 20px;
            transition: margin 0.3s ease;
          }

          /* MOBILE: Sidebar moves to bottom, Content takes full width */
          @media (max-width: 768px) {
            .admin-content {
              margin-left: 0 !important;
              padding-left: 10px;
              padding-right: 10px;
              padding-bottom: 90px; /* Extra space so bottom nav doesn't cover content */
            }
            
            /* Hide the "Sender Details" column on very small screens to save space */
            .hide-on-mobile {
              display: none;
            }
          }
        `}
      </style>

      <div className="admin-wrapper">
        
        <ProfileSidebar />
        <div className="admin-content">                     
          <Container fluid className="p-0">
            
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 mt-2">
              <div className="mb-2 mb-md-0">
                  <h2 className="fw-bold text-dark mb-0">User Feedback</h2>
                  <p className="text-muted small mb-0">Manage contact form submissions.</p>
              </div>
              <Badge bg="primary" className="px-3 py-2 rounded-pill">Total: {reviews.length}</Badge>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {reviews.length === 0 ? (
               <div className="text-center p-5 bg-white rounded shadow-sm">
                  <FaCommentDots size={40} className="text-muted mb-3" />
                  <h5 className="text-muted">No messages found.</h5>
               </div>
            ) : (
              
              <Card className="border-0 shadow-sm overflow-hidden">
                <Table hover responsive className="mb-0 align-middle text-nowrap">
                  <thead className="bg-light text-secondary small">
                    <tr>
                      <th className="py-3 ps-4" style={{ width: '5%' }}>#</th>
                      <th className="py-3" style={{ width: '25%' }}>Sender</th>
                      <th className="py-3" style={{ width: '40%' }}>Preview</th>
                      <th className="py-3 hide-on-mobile" style={{ width: '15%' }}>Date</th>
                      <th className="py-3 text-end pe-4" style={{ width: '15%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review, index) => (
                      <tr key={review._id}>
                        <td className="ps-4 text-muted small">{index + 1}</td>
                        
                        <td>
                          <div className="d-flex align-items-center">
                              <div className="rounded-circle bg-light d-flex justify-content-center align-items-center me-2 d-none d-md-flex" style={{width:'35px', height:'35px'}}>
                                  <FaUser className="text-secondary" size={12}/>
                              </div>
                              <div className="d-flex flex-column">
                                  <span className="fw-bold text-dark" style={{fontSize: '0.9rem'}}>{review.name}</span>
                                  <span className="text-muted small d-none d-sm-block">{review.email}</span>
                              </div>
                          </div>
                        </td>

                        <td className="text-secondary">
                          <span 
                              style={{ cursor: 'pointer', fontSize: '0.9rem', maxWidth:"200px"}} 
                              onClick={() => handleView(review)}
                              className="text-truncate d-block"
                              
                          >
                              {review.review}
                          </span>
                        </td>

                       
                        <td className="text-muted small hide-on-mobile">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </td>

                        <td className="text-end pe-4">
                          <Button 
                              variant="outline-primary" 
                              size="sm" 
                              className="me-2" 
                              onClick={() => handleView(review)}
                          >
                              View
                          </Button>
                          <Button 
                              variant="outline-danger" 
                              size="sm" 
                              onClick={() => handleDelete(review._id)}
                          >
                              <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            )}
          </Container>
        </div>

  
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton className="border-0">
              <Modal.Title className="fw-bold">Message Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {selectedReview && (
                  <>
                      <div className="mb-4 p-3 bg-light rounded">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                             <h5 className="mb-0 fw-bold">{selectedReview.name}</h5>
                             <small className="text-muted">{new Date(selectedReview.createdAt).toLocaleString()}</small>
                          </div>
                          <div className="text-muted small d-flex align-items-center">
                              <FaEnvelope className="me-2"/> {selectedReview.email}
                          </div>
                      </div>

                      <h6 className="fw-bold text-secondary mb-2 small">MESSAGE CONTENT</h6>
                      <div className="p-3 border rounded bg-white">
                          <p className="mb-0" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                              {selectedReview.review}
                          </p>
                      </div>
                  </>
              )}
          </Modal.Body>
          <Modal.Footer className="border-0">
              {selectedReview && (
                  <Button variant="primary" href={`mailto:${selectedReview.email}?subject=Re: Inquiry`}>
                      <FaReply className="me-2"/> Reply
                  </Button>
              )}
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  );
}

export default AdminReviews;