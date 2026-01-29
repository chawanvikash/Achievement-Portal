import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import NavBar from '../includes/NavBar';
import Footer from '../includes/Footer';
import "../css/Contact.css"; 
import { BASE_URL } from '../helper';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "", 
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);

  const url = BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await axios.post(url + "/api/contact/review", formData);
      console.log("Success:", response.data);
      setStatus("success");
  
      setFormData({ name: "", email: "", review: "" });
 
      setTimeout(() => setStatus("idle"), 5000);

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.error || "Failed to send message. Please try again.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  return (
    <>
      <NavBar />
 
      <div className="contact-hero mt-5">
         <Container className="text-center text-dark">
            <h1 className="display-4 fw-bold">Get in Touch</h1>
            <p className="lead">We'd love to hear from you. Reach out to us for any queries.</p>
         </Container>
      </div>

      <Container className="py-5">
        <Row className="g-5">
            
            <Col lg={7}>
                <Card className="border-0 shadow-sm p-4">
                    <Card.Body>
                        <h3 className="fw-bold mb-4 text-dark">Send us a Message</h3>
                        
                        {status === "success" && (
                            <Alert variant="success">
                                <FaPaperPlane className="me-2"/> Message sent successfully! We will get back to you soon.
                            </Alert>
                        )}

                        {status === "error" && (
                            <Alert variant="danger">{errorMessage}</Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">YOUR NAME</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        placeholder="John Doe" 
                                        required 
                                        className="form-control-lg"
                                    />
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">EMAIL ADDRESS</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        placeholder="name@example.com" 
                                        required 
                                        className="form-control-lg"
                                    />
                                </Col>
                            </Row>

                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold small text-muted">YOUR MESSAGE</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={5} 
                                    name="review" 
                                    value={formData.review} 
                                    onChange={handleChange} 
                                    placeholder="How can we help you?" 
                                    required 
                                />
                            </Form.Group>

                            <Button 
                                variant="primary" 
                                type="submit" 
                                size="lg" 
                                className="w-100 fw-bold"
                                disabled={status === "submitting"}
                            >
                                {status === "submitting" ? (
                                    <><Spinner as="span" animation="border" size="sm" className="me-2"/> Sending...</>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>

            <Col lg={5}>
                <div className="ps-lg-4">
                    <h3 className="fw-bold mb-4 text-dark">Contact Information</h3>
                    <p className="text-muted mb-4">
                        Have questions about admissions, research, or campus life? 
                        Feel free to reach out to us directly.
                    </p>

                    <div className="d-flex mb-4">
                        <div className="icon-box me-3">
                            <FaMapMarkerAlt className="text-primary" size={24} />
                        </div>
                        <div>
                            <h6 className="fw-bold mb-1">Address</h6>
                            <p className="text-muted small">
                                Indian Institute of Engineering Science and Technology,<br/>
                                Shibpur, Howrah, West Bengal, India
                            </p>
                        </div>
                    </div>

                    <div className="d-flex mb-4">
                        <div className="icon-box me-3">
                            <FaPhoneAlt className="text-primary" size={20} />
                        </div>
                        <div>
                            <h6 className="fw-bold mb-1">Phone</h6>
                            <p className="text-muted small"> +91 (033) 2668 4561 to 63</p>
                        </div>
                    </div>

                    <div className="d-flex mb-4">
                        <div className="icon-box me-3">
                            <FaEnvelope className="text-primary" size={20} />
                        </div>
                        <div>
                            <h6 className="fw-bold mb-1">Email</h6>
                            <p className="text-muted small">head@cs.iiests.ac.in</p>
                        </div>
                    </div>

                    <div className="map-container rounded overflow-hidden shadow-sm mt-4">
                        <iframe 
                            title="IIEST Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.710404419791!2d88.30678631495923!3d22.55251698519293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279c91a8d2d49%3A0x81dd1637291d8e94!2sIIEST%20Shibpur!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                            width="100%" 
                            height="250" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            </Col>
        </Row>
      </Container>

      <div className="bg-light py-5 text-center border-top">
         <Container>
            <h3 className="fw-bold">Stay Connected</h3>
            <p className="text-muted mb-4">Follow us for the latest updates, news and achievements.</p>
            <a href="/register" className="btn btn-outline-primary fw-bold px-4 rounded-pill">
                Register Now
            </a>
         </Container>
      </div>

      <Footer />
    </>
  );
}

export default ContactPage;