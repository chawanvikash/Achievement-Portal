import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import NavBar from '../includes/NavBar';
import { BASE_URL } from '../helper';

function VerifyEmailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const emailFromRegister = location.state?.email || '';

    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const url =BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(url+`/api/verify-otp`, { email: emailFromRegister, otp },{ withCredentials: true });
            setSuccess("Email Verified Successfully! Redirecting to Login...");
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            setError(err.response?.data?.error || "Verification failed.");
        }
    };

    return (
        <>
            <NavBar />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Card style={{ width: '400px' }} className="shadow p-4">
                    <h3 className="text-center mb-4">Verify Your Email</h3>
                    <p className="text-center text-muted">Enter the 6-digit code sent to <br/><strong>{emailFromRegister}</strong></p>
                    
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter 6-digit OTP" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength="6"
                                className="text-center fs-4 tracking-widest"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Verify OTP
                        </Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default VerifyEmailPage;