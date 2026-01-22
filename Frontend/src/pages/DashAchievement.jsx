import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import photo from "../assets/icon.jpg";
import { FaEdit, FaTrash, FaPlus, FaCheckCircle, FaClock, FaImage ,FaArrowLeft} from 'react-icons/fa';
import ProfileSidebar from '../includes/ProfileSideBar';
import "../css/AddAcheive.css";
import { BASE_URL } from '../helper'; 

function DashAchievement() {
  const { user } = useAuth(); 
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load,setLoad]=useState(false);
  const [error, setError] = useState(null);
  
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null); 
  const [editImageFile, setEditImageFile] = useState(null);
  
  
  const url = BASE_URL;

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
    setLoad(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) {
        formData.append('image', image);
    }

    try {
    
      const response = await axios.post(url+'/api/dashboard/posts', formData);
      
      setMyPosts([response.data, ...myPosts]); 
      
      setTitle('');
      setBody('');
      e.target.reset(); 

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error creating post");
    } finally{
      setLoad(false);
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
    setEditImageFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  
  const handleUpdatePost = async () => {
    try {
      const formData = new FormData();
    
      formData.append('title', editingPost.title);
      formData.append('body', editingPost.body);
      if (editImageFile) {
          formData.append('image', editImageFile);
      }
      const response = await axios.put(url + `/api/dashboard/posts/${editingPost._id}`, formData);

   
      setMyPosts(myPosts.map(post => (post._id === editingPost._id ? response.data : post)));
      handleCloseModal(); 
    } catch (err) {
      console.error(err);
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
         
              <Form onSubmit={handleCreatePost} encType="multipart/form-data">
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="What did you achieve? (Title)" 
                    className="form-control-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={load}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    placeholder="Share the details of your success..."
                    className="form-control-light"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    disabled={load}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="text-muted small"><FaImage className="me-1"/> Upload Evidence / Photo</Form.Label>
                    <Form.Control 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        disabled={load}
                    />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit" className="px-4 fw-bold" disabled={load}>
                    {load ? (
                                <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>
                                Please Wait..
                                </>
                                ) :
                                <><FaPlus className="me-2" /> Post Achievement
                                </>
                              }
                    
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
                    
                    {post.image && post.image.url && (
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                            <Card.Img 
                                variant="top" 
                                src={post.image.url ?? photo} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    )}

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
              <Form.Group className="mb-3">
            <Form.Label className="text-muted small">
                <FaImage className="me-1" /> Upload New Photo (Optional)
            </Form.Label>
            {editingPost?.image && !editImageFile && (
                 <div className="mb-2 small text-info">Current Image exists. Uploading new one will replace it.</div>
            )}
            <Form.Control
                type="file"
                accept="image/*"
 
                onChange={(e) => setEditImageFile(e.target.files[0])}
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