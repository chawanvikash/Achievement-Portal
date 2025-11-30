import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Modal, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaCheckCircle, FaClock } from 'react-icons/fa';
import HomeBtn from '../includes/HomeBtn';
import ProfileSidebar from '../includes/ProfileSideBar';
import "../css/AddAcheive.css"; 

function DashAchievement() {
  const { user } = useAuth(); 
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null); 
  const url="http://localhost:8080";

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axios.get(url+'/api/dashboard/myposts');
        setMyPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching your posts. Are you logged in?");
      }
      setLoading(false);
    };
    if (user) fetchMyPosts();
  }, [user]); 

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(url+'/api/dashboard/posts', newPost);
      setMyPosts([response.data, ...myPosts]); 
      setNewPost({ title: '', body: '' }); 
    } catch (err) {
      setError(err.response?.data?.error || "Error creating post");
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await axios.delete(url+`/api/dashboard/posts/${postId}`);
        setMyPosts(myPosts.filter(post => post._id !== postId)); 
      } catch (err) {
        setError(err.response?.data?.error || "Error deleting post");
      }
    }
  };

  const handleOpenEditModal = (post) => {
    setEditingPost({ ...post }); 
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleUpdatePost = async () => {
    try {
      const response = await axios.put(url+`/api/dashboard/posts/${editingPost._id}`, {
        title: editingPost.title,
        body: editingPost.body
      });
      setMyPosts(myPosts.map(post => (post._id === editingPost._id ? response.data : post)));
      handleCloseModal(); 
    } catch (err) {
      setError(err.response?.data?.error || "Error updating post");
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <Spinner animation="border" variant="primary" />
        <p>Loading Dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="dashboard-wrapper">
      <ProfileSidebar />

      <div className="main-content">
        <HomeBtn />
        
        <Container fluid="md" className="py-4">

          <div className="dashboard-header mb-5">
            <div>
              <h2 className="fw-bold text-dark">Your Achievements</h2>
              <p className="text-muted">Share your academic and professional milestones.</p>
            </div>
            
          </div>

          {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}


          <Card className="create-post-card mb-5 shadow-sm border-0">
            <Card.Body className="p-4">
              <h5 className="mb-3 fw-bold text-secondary">Post a New Achievement</h5>
              <Form onSubmit={handleCreatePost}>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="What did you achieve? (Title)" 
                    className="form-control-lg"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    placeholder="Share the details of your success..."
                    className="form-control-light"
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    required
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit" className="px-4 fw-bold">
                    <FaPlus className="me-2" /> Post Achievement
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

 
          <h5 className="mb-3 text-secondary fw-bold">Your Timeline</h5>
          <Row>
            {myPosts.length === 0 ? (
              <Col>
                <div className="empty-state text-center p-5 bg-light rounded">
                  <h4 className="text-muted">No achievements yet.</h4>
                  <p>Start building your portfolio by adding your first achievement above!</p>
                </div>
              </Col>
            ) : (
              myPosts.map(post => (
                <Col md={12} lg={6} key={post._id} className="mb-4">
                  <Card className="achievement-card h-100 border-0 shadow-sm">
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        
                      
                        <div className={`status-indicator ${post.isVerified ? 'approved' : 'pending'}`}>
                          {post.isVerified ? (
                            <><FaCheckCircle className="me-1"/> Published</>
                          ) : (
                            <><FaClock className="me-1"/> Pending Review</>
                          )}
                        </div>
                        
                      
                        <div className="action-buttons">
                          <Button variant="link" className="text-muted p-0 me-3" onClick={() => handleOpenEditModal(post)}>
                            <FaEdit size={18} title="Edit" />
                          </Button>
                          <Button variant="link" className="text-danger p-0" onClick={() => handleDeletePost(post._id)}>
                            <FaTrash size={18} title="Delete" />
                          </Button>
                        </div>
                      </div>

                      <Card.Title className="fw-bold mb-2">{post.title}</Card.Title>
                      <Card.Text className="text-secondary flex-grow-1 description-text">
                        {post.body}
                      </Card.Text>
                      
                      <div className="mt-3 pt-3 border-top">
                        <small className="text-muted">
                          Submitted on {new Date(post.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>

       
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold">Edit Achievement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted small fw-bold">TITLE</Form.Label>
                <Form.Control 
                  type="text"
                  value={editingPost ? editingPost.title : ''}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="form-control-lg"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted small fw-bold">DESCRIPTION</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4}
                  value={editingPost ? editingPost.body : ''}
                  onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="primary" onClick={handleUpdatePost}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default DashAchievement;
