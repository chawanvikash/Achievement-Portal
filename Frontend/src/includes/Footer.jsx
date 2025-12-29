import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../css/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <Row className="py-5">
          
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-heading">IIEST Shibpur</h5>
            <p className="footer-text">
              Department of Computer Science & Technology. <br/>
              Empowering students, faculty, and alumni to share and celebrate academic excellence.
            </p>
            <div className="social-icons mt-3">
              <a href="https://www.facebook.com/iiest.shibpur.official/" className="social-link"><FaFacebookF /></a>
              <a href="https://x.com/iiest_s/status/1763140891286331532" className="social-link"><FaTwitter /></a>
              <a href="https://www.linkedin.com/school/iiests.ac.in/?originalSubdomain=in" className="social-link"><FaLinkedinIn /></a>
              
            </div>
          </Col>

          
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">Events & Fests</Link></li>
              <li><Link to="/login">Login / Register</Link></li>
              <li><Link to="/dashboard">My Dashboard</Link></li>
            </ul>
          </Col>

          
          <Col md={4}>
            <h5 className="footer-heading">Contact Us</h5>
            <ul className="footer-contact list-unstyled">
              <li>
                <FaMapMarkerAlt className="me-2 icon" />
                <span>P.O. - Botanic Garden, Howrah - 711 103, West Bengal, India</span>
              </li>
              <li>
                <FaPhoneAlt className="me-2 icon" />
                <span>+91 33 2668 4561</span>
              </li>
              <li>
                <FaEnvelope className="me-2 icon" />
                <span>head@cs.iiests.ac.in</span>
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        
        <Row className="py-3">
          <Col className="text-center">
            <p className="mb-0 copyright-text">
              &copy; {currentYear} Department of Computer Science & Technology, IIEST Shibpur. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;