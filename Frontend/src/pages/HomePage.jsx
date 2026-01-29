import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Badge ,Spinner} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUser, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import NavBar from '../includes/NavBar';
import Footer from '../includes/Footer';
import { BASE_URL } from '../helper';
import photo from "../assets/icon.jpg"; 
import '../css/HomePage.css';

function HomePage() {
  

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading,setLoading]=useState(true);
  
  
  const url = BASE_URL;

  useEffect(() => {
    const fetchHome = async () => {
      try {
      
        const response = await axios.get(url + '/api/public/achievements');
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching public posts:", err);
        setError("Could not load recent achievements.");
      }finally{
        setLoading(false);
      }
    };

    fetchHome(); 
  }, []); 

 if (loading) {
    return <Container className="text-center mt-5"><Spinner animation="border" /> <p>Loading pending users...</p></Container>;
  }
 
  return (
    <>
      <NavBar/>
    
      <div className='homepage'>

<section className="hero">
  <div className="hero-images">
    <img src="https://www.iiests.ac.in/assets/images/whyiiest/02.jpg" className="hero-img img1" alt="img1" />
    <img src="https://assets.telegraphindia.com/telegraph/2024/Apr/1712148081_iiest.jpg" className="hero-img img2" alt="img2" />
    <img src="https://cache.careers360.mobi/media/article_images/2023/5/27/iiest-shibpur-nit-engineering-college-west-bengal-featured-image.jpg" className="hero-img img3" alt="img3" />
  </div>

  <div className="overview text-center py-5 text-white">
    <h1 className="display-4 fw-bold">Department of Computer Science & Technology</h1>
    <p className="lead">
      Celebrating excellence in academics, research, innovation, and culture at IIEST Shibpur.
    </p>
  </div>
</section>

        
       
        <section className="content py-5">
          <Container>
            <h2 className="text-center mb-5 fw-bold text-dark">Why Join Us?</h2>
            <Row className="g-4">
              <Col md={4}>
                <Card className="box1 h-100 text-center p-4 border-0 shadow-sm highlight-card" id='content-box'>
                  <Card.Body>
                    <div className="icon-wrapper text-dark mb-3 display-4" id='icon1'>
                       <FaTrophy />
                    </div>
                    <h3>Academic Excellence</h3>
                    <p>Consistently ranked among the top institutes in India, with students excelling in GATE, UPSC, and global placements.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="box2 h-100 text-center p-4 border-0 shadow-sm highlight-card" id='content-box'>
                  <Card.Body>
                    <div className="icon-wrapper text-success mb-3 display-4" id='icon2'>
                        <FaTrophy /> 
                    </div>
                    <h3>Research & Innovation</h3>
                    <p>Recognized for pioneering work in renewable energy, AI, and sustainable technologies with over 500+ publications annually.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="box3 h-100 text-center p-4 border-0 shadow-sm highlight-card" id='content-box'>
                  <Card.Body>
                    <div className="icon-wrapper mb-3 text-dark display-4" id='icon3'>
                         <FaTrophy />
                    </div>
                    <h3>Global Presence</h3>
                    <p>Alumni contributing to organizations like Google, Microsoft, ISRO, NASA, and leading global universities.</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

      
        <section className="latest-achievements-section py-5">
  <Container>
    <h2 className="section-title text-center mb-5 fw-bold text-dark">
      Latest Student Achievements
    </h2>

    {error && <p className="text-danger text-center">{error}</p>}

    {posts.length === 0 ? (
      <div className="no-posts-state text-center p-5 border rounded bg-white">
        <p className="text-muted mb-0">
          <FaTrophy className="mb-2" size={24} />
          <br />
          New achievements coming soon!
        </p>
      </div>
    ) : (
      <>
        <Row className="g-4 verified-posts-grid">
          {posts.filter(post => post.user).slice(0, 3).map(post => (
            <Col key={post._id} md={6} lg={4}>
              <Link to={`/achievements/${post._id}`} style={{ textDecoration: "none" }}>
                
                <Card className="achievement-card-pro h-100">
                  
                  <div className="card-img-wrapper-pro">
                    <Card.Img
                      src={post?.image?.url ?? photo}
                      className="card-img-pro"
                    />
                    <Badge className="role-badge-pro">
                      {post.user?.role || "Student"}
                    </Badge>
                  </div>

                  <Card.Body>
                    <div className="post-meta mb-2 small text-muted">
                      <FaCalendarAlt className="me-1" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>

                    <Card.Title>
                      {post.title}
                    </Card.Title>

                    <Card.Text>
                      {post.body.length > 100
                        ? post.body.substring(0, 100) + "..."
                        : post.body}
                    </Card.Text>

                    <div className="post-footer">
                      <FaUser />
                      <span>{post.user?.username || "Anonymous"}</span>
                    </div>
                  </Card.Body>

                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <LinkContainer to="/achievements/students">
            <Button size="lg" className="view-all-btn px-5 rounded-pill">
              View All Achievements <FaArrowRight className="ms-2" />
            </Button>
          </LinkContainer>
        </div>
      </>
    )}
  </Container>
</section>


       
  <section 
  className="achievements-list py-5"
  style={{
    background: "linear-gradient(135deg, #f0f7ff, #ffffff)"
  }}
>
  <Container>
    <h2 className="text-center mb-5 fw-bold text-dark">
      Notable Departmental Milestones
    </h2>

    <ul className="list-group list-group-flush lead mx-auto" style={{ maxWidth: "800px" }}>
      
      <li 
        className="list-group-item d-flex align-items-start gap-3 mb-3 shadow-sm rounded-4"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          transition: "0.3s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateX(10px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
      >
        <span className="fw-bold text-white px-3 py-1 rounded-pill"
          style={{ background: "linear-gradient(135deg,#4facfe,#00f2fe)" }}>
          1
        </span>
        Ranked in top 10 engineering research institutes in India (2024).
      </li>

      <li 
        className="list-group-item d-flex align-items-start gap-3 mb-3 shadow-sm rounded-4"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          transition: "0.3s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateX(10px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
      >
        <span className="fw-bold text-white px-3 py-1 rounded-pill"
          style={{ background: "linear-gradient(135deg,#43e97b,#38f9d7)" }}>
          2
        </span>
        Students won national awards in Smart India Hackathon & robotics competitions.
      </li>

      <li 
        className="list-group-item d-flex align-items-start gap-3 mb-3 shadow-sm rounded-4"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          transition: "0.3s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateX(10px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
      >
        <span className="fw-bold text-white px-3 py-1 rounded-pill"
          style={{ background: "linear-gradient(135deg,#fa709a,#fee140)" }}>
          3
        </span>
        MoUs signed with MIT, Stanford, and NUS for collaborative research.
      </li>

      <li 
        className="list-group-item d-flex align-items-start gap-3 mb-3 shadow-sm rounded-4"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          transition: "0.3s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateX(10px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
      >
        <span className="fw-bold text-white px-3 py-1 rounded-pill"
          style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
          4
        </span>
        Published 50+ patents and innovations in the past 5 years.
      </li>

      <li 
        className="list-group-item d-flex align-items-start gap-3 shadow-sm rounded-4"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          transition: "0.3s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateX(10px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
      >
        <span className="fw-bold text-white px-3 py-1 rounded-pill"
          style={{ background: "linear-gradient(135deg,#f7971e,#ffd200)" }}>
          5
        </span>
        Excellence in sports & cultural fests at national and international level.
      </li>

    </ul>
  </Container>
</section>


        
        <section className="action text-center py-5 text-white" >
          <Container>
            <h2 className="fw-bold mb-3">Be a Part of Our Journey</h2>
            <p className="lead mb-4">Join us in achieving milestones and shaping the future of technology and society.</p>
            <LinkContainer to="/register">
               <Button variant="light" size="lg" className="reg-btn">Register Now</Button>
            </LinkContainer>
          </Container>
        </section>
     
      </div>
      <Footer/>
    </>
  );
}

export default HomePage;
