import React, { useState } from 'react';
import axios from 'axios';
import "../css/Register.css";
import { useNavigate, Link } from 'react-router-dom'; 
import { Alert,Button, Container, Card, Form, Spinner } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { BASE_URL } from '../helper';


function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student'
  });
  
  const url =BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response=await axios.post(url + '/api/register', formData);
        
      console.log("OTP Sent, navigating to verify...");
      
      
      navigate('/verify-email', { state: { email: formData.email } });
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed.';
      console.error('Error Registering user:', errorMessage);
      setError(errorMessage); 
      setFormData(prev => ({ ...prev, password: '' })); 
    }
  };

  return (
    <>
    <Link to="/" className="text-decoration-none">
        <Button variant="link" className="text-muted p-0 -mb-4 fw-bold" style={{ textDecoration: 'none' }}>
          <FaArrowLeft className="me-2" /> Back to Achievements
        </Button>
      </Link>

    
    <div className="register-container" style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
      <form onSubmit={handleSubmit} className='register-form'>
        {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
        
        <h2>Register</h2>
        
        <div className="input-group">
            <label htmlFor="ipname">Username</label>
            <input id='ipname' type="text" name="username" placeholder="Full Name" value={formData.username} onChange={handleChange}  disabled={loading} required/>
        </div>

        <div className="input-group">
            <label htmlFor="ipemail">Email Address</label>
            <input id='ipemail' type="email" name="email" placeholder="Email (use Gsuit id for Student/Faculty)" value={formData.email} onChange={handleChange} disabled={loading} required/>
        </div>

        <div className="input-group">
            <label htmlFor="ippass">Password</label>
            <input id='ippass' type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} disabled={loading} required/>
        </div>

        <div className="input-group">
            <label htmlFor="role-select">Role</label>
            <select id="role-select" name="role" onChange={handleChange} value={formData.role} className='opts' disabled={loading} required>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="alumni">Alumni</option>
              <option value="staff">Staff</option>
            </select>
        </div>

        <button type="submit" className='sub-btn' disabled={loading}>
          {loading ? (
                      <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>
                      Wait...
                      </>
                      ) : ("Register")
          }</button>
        
        <br />
        <div style={{marginTop: '15px', textAlign: 'center'}}>
            <p style={{marginBottom: '5px'}}>Already have an account?</p>
            <Link to="/login">
                <button type="button" className='reg-btn'>Login Here</button>
            </Link>
        </div>

      </form>
    </div>
    </>
  );
}

export default RegisterPage;