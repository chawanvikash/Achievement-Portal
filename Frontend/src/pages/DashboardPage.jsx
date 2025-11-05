import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import {  Link } from 'react-router-dom';
import HomeBtn from '../includes/HomeBtn';
function DashboardPage() {

  const { user } = useAuth(); 
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null); 
  const url="http://localhost:8080"

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
    fetchMyPosts();
  }, []); 


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
    if (window.confirm("Are you sure you want to delete this post?")) {
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
    return <Container className="text-center mt-5"><Spinner animation="border" /> <p>Loading Dashboard...</p></Container>;
  }
  
  return (
    <>
    <HomeBtn/>
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          
          <h2>Welcome, {user.username}!</h2>
          <p>This is your personal dashboard. You can manage your achievements here.</p>
        </Col>
      </Row>

      
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

     
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Create New Achievement</Card.Title>
              <Form onSubmit={handleCreatePost}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g., Won Smart India Hackathon"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Body</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    placeholder="Describe your achievement..."
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">Post Achievement</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

     
      <Row>
        <Col>
          <h3>Your Achievements</h3>
          {myPosts.length === 0 ? (
            <p>You haven't posted any achievements yet.</p>
          ) : (
            myPosts.map(post => (
              <Card key={post._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    Posted by: {post.user.username} on {new Date(post.createdAt).toLocaleDateString()}
                  </Card.Subtitle>
                  <Button variant="outline-primary" size="sm" onClick={() => handleOpenEditModal(post)}>Edit</Button>
                  <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleDeletePost(post._id)}>Delete</Button>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>

     
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Achievement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text"
                value={editingPost ? editingPost.title : ''}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                value={editingPost ? editingPost.body : ''}
                onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleUpdatePost}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </>
  );

}

export default DashboardPage;