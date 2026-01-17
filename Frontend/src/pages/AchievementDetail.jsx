import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Badge, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaUserCircle } from 'react-icons/fa';

import photo from "../assets/success.avif"; 
import Footer from "../includes/Footer.jsx"

function AchievementDetail() {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const url = "http://localhost:8080";

 
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${url}/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error(err);
        setError("Could not load achievement details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

 
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

 
  if (error || !post) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger">{error || "Post not found"}</Alert>
        <Link to="/achievements/students">
            <Button variant="outline-primary">Go Back</Button>
        </Link>
      </Container>
  );
  }

  return (
    <>
    <Container className="mt-5 mb-5" style={{ maxWidth: '900px' }}>
      
     
      <Link to="/achievements/students" className="text-decoration-none">
        <Button variant="link" className="text-muted p-0 mb-4 fw-bold" style={{ textDecoration: 'none' }}>
          <FaArrowLeft className="me-2" /> Back to Achievements
        </Button>
      </Link>

      
      <div className="mb-4">
        <div className="d-flex align-items-center gap-3 mb-3">
            <Badge bg="primary" className="px-3 py-2 rounded-pill" style={{fontSize: '0.85rem', letterSpacing: '0.5px'}}>
                {post.user?.role?.toUpperCase() || 'STUDENT'}
            </Badge>
            <span className="text-muted small fw-bold">
                <FaCalendarAlt className="me-1 text-secondary"/> 
                {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
        </div>
        
        <h1 className="display-4 fw-bold text-dark mb-3 super-title" style={{ lineHeight: '1.2' }}>
            {post.title}
        </h1>
      </div>

   
      <div className="position-relative mb-5">
        <img 
            
            src={post.image?.url || photo} 
            alt={post.title}
            className="w-100 rounded-4 shadow-sm"
            style={{ 
                maxHeight: '500px', 
                objectFit: 'cover',
                border: '1px solid rgba(0,0,0,0.05)' 
            }} 
        />
      </div>

      <Row>
       
        <Col md={3} className="d-none d-md-block border-end pe-4">
             <div className="sticky-top" style={{ top: '2rem' }}>
                <p className="text-uppercase text-muted small fw-bold mb-3">Posted By</p>
                <div className="d-flex align-items-start flex-column gap-2">
                    <FaUserCircle className="text-secondary" size={45} />
                    <div>
                        <h5 className="fw-bold m-0 text-dark">{post.user?.username}</h5>
                        <small className="text-muted super-text">{post.user?.email}</small>
                    </div>
                </div>
            </div>
        </Col>

        
        <Col xs={12} className="d-md-none mb-4">
            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                 <FaUserCircle className="text-secondary" size={40} />
                 <div>
                    <h6 className="fw-bold m-0">{post.user?.username}</h6>
                    <small className="text-muted">{post.user?.email}</small>
                 </div>
            </div>
        </Col>

        <Col md={9} className="ps-md-4">
             <p className="lead text-dark" style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap', fontSize: '1.15rem' }}>
               
                 <span style={{ float: 'left', fontSize: '3.5rem', lineHeight: '0.8', paddingRight: '1px', fontWeight: 'bold' }}>
                    {post.body.charAt(0)}
                 </span>
                 <span>{post.body.substring(1)}</span>
                 
             </p>
        </Col>
      </Row>

    </Container>
    <Footer/>
    </>
  );
}

export default AchievementDetail;