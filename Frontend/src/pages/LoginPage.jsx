import React, { useState } from 'react';
import axios from 'axios';
import "../css/Register.css";
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../helper';
import { Alert, Spinner,Button } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaUserCircle } from 'react-icons/fa';
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate(); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [formData, setFormData] = useState({
    email: '',
    password: '',  
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
      const response = await axios.post(
        url + '/api/login',
        formData,{ withCredentials: true }
        
      );

      console.log('Success:', response.data.message);
      login(response.data.user); 
      
      navigate('/dashboard');
      
      setFormData({
        email: '',        
        password: '',
      });
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Invalid email or password.';
      console.error('Error Login user:', errorMessage);
      setError(errorMessage); 
    } finally {
    
      setLoading(false);
    }
  };

 
  if (loading) {
    return (
      <div className="loading-screen" style={{ textAlign: 'center', marginTop: '20%' }}>
        <Spinner animation="border" variant="primary" />
        <p>Logging in...</p>
      </div>
    );
  }

  return (
    <>
      <Link to="/" className="text-decoration-none">
        <Button variant="link" className="text-muted p-0 mb-4 fw-bold" style={{ textDecoration: 'none' }}>
          <FaArrowLeft className="me-2" /> Back to Achievements
        </Button>
      </Link>

      
    
      {error && (
        <div className="container mt-5" style={{ maxWidth: '450px' }}>
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className='register-form'>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="ipemail">Email-Address</label>
          <input 
            id='ipemail' 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="ippass">Password</label>
          <input 
            id='ippass' 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required
          />
        </div>

        <button type="submit" className='sub-btn'>Login</button> 
        
        <br /> <br />
        
        <div className="text-center">
          <p>New Account?</p>
          
          <Link to="/register">
            <button type="button" className='reg-btn'>Register</button>
          </Link>
        </div>
      </form>   
    </>
  );
}

export default LoginPage;