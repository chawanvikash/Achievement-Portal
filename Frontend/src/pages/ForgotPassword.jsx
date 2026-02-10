import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaKey, FaEnvelope, FaLock, FaArrowLeft, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../helper';

const ForgotPassword = () => {
    const navigate = useNavigate(); 
    const [step, setStep] = useState(1); 
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const res = await axios.post(`${BASE_URL}/api/forgot-password`, { email });
            setMessage(res.data.message);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${BASE_URL}/api/reset-password`, { email, otp, newPassword });
            setMessage(res.data.message + " Redirecting to login...");
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.error || "Invalid OTP or request expired");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <Card className="shadow-lg border-0 p-4" style={{ maxWidth: '450px', width: '100%', borderRadius: '15px' }}>
                <Card.Body>
                    <div className="text-center mb-4">
                        <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                            <FaKey size={28} />
                        </div>
                        <h3 className="fw-bold">{step === 1 ? 'Forgot Password' : 'Reset Password'}</h3>
                        <p className="text-muted small">
                            {step === 1 ? 'Enter your institutional email to receive a reset code.' : 'Enter the 6-digit code and your new password.'}
                        </p>
                    </div>

                    {message && <Alert variant="success" className="small text-center">{message}</Alert>}
                    {error && <Alert variant="danger" className="small text-center">{error}</Alert>}

                    {step === 1 ? (
                        <Form onSubmit={handleRequestOTP}>
                            <Form.Group className="mb-4">
                                <Form.Label className="small fw-bold text-secondary">OFFICIAL EMAIL</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0"><FaEnvelope className="text-muted" /></span>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="name@iiests.ac.in" 
                                        className="bg-light border-start-0"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 py-2 fw-bold" disabled={loading}>
                                {loading ? <Spinner size="sm" /> : 'Send Reset OTP'}
                            </Button>
                        </Form>
                    ) : (
                        <Form onSubmit={handleResetPassword}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold text-secondary">6-DIGIT OTP</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter OTP" 
                                    className="text-center fw-bold letter-spacing-2"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required 
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="small fw-bold text-secondary">NEW PASSWORD</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0"><FaLock className="text-muted" /></span>
                                    <Form.Control 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        className="bg-light border-x-0"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required 
                                    />
                
                                    <span 
                                        className="input-group-text bg-light border-start-0" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash className="text-muted" /> : <FaEye className="text-muted" />}
                                    </span>
                                </div>
                            </Form.Group>
                            <Button variant="success" type="submit" className="w-100 py-2 fw-bold" disabled={loading}>
                                {loading ? <Spinner size="sm" /> : 'Update Password'}
                            </Button>
                            <Button variant="link" onClick={() => setStep(1)} className="w-100 mt-2 text-decoration-none text-muted small">
                                <FaArrowRight size={10} className="me-1" /> Re-send code
                            </Button>
                        </Form>
                    )}

                    <div className="text-center mt-4">
                        <Link to="/login" className="text-primary small text-decoration-none fw-bold">Back to Login</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ForgotPassword;