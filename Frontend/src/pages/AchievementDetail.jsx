import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import NavBar from '../includes/NavBar';
import Footer from '../includes/Footer';
import photo from "../assets/achievement.jpg"; 

function AchievementDetail() {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:8080";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(url+`/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (!post) return <div className="text-center mt-5"><h3>Post not found</h3></div>;

  return (
    <>
     
      <Container className="mt-0 indi-achiev-container " style={{maxWidth:'1000px'}}>
        <Link to="/achievements/students" className="text-decoration-none">
            <Button variant="outline-secondary" className="mb-4"><FaArrowLeft /> Back to List</Button>
        </Link>
        
        <Card className=" border-0">
          <Card.Img variant="top" src={post.image?.url || photo} style={{ maxHeight: '400px', objectFit: 'cover' }} />
          <Card.Body className="p-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Badge bg="primary" className="p-2">{post.user?.role || 'Student'}</Badge>
                <small className="text-muted"><FaCalendarAlt /> {new Date(post.createdAt).toLocaleDateString()}</small>
            </div>

            <Card.Title className="display-5 fw-bold mb-4">{post.title}</Card.Title>
            
            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded">
                <FaUser className="me-2 text-primary" size={24}/>
                <div>
                    <h5 className="m-0">{post.user?.username}</h5>
                    <small className="text-muted">{post.user?.email}</small>
                </div>
            </div>

            <Card.Text className="lead" style={{ whiteSpace: 'pre-wrap' }}>
              {post.body}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <br /><br />
      <Footer />
    </>
  );
}

export default AchievementDetail;