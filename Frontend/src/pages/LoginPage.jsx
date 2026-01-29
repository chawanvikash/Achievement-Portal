import React, { useState } from 'react';
import axios from 'axios';
import "../css/Register.css";
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../helper';
import { Alert, Spinner,Button } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaUserCircle,FaEye, FaEyeSlash } from 'react-icons/fa';


function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate(); 
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);  
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
    } 

  };



  return (
    <>
       <Link to="/" className="text-decoration-none">
        <Button
          variant="success"
          className="fw-bold rounded-pill px-3 py-2 shadow-sm mb-3"
        >
          <FaArrowLeft className="me-2" />
          Back to Achievements
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

        <div className="input-group" style={{ position: "relative" }}>
          <label htmlFor="ippass">Password</label>
          <input 
          id='ippass' 
          type={showPassword ? "text" : "password"} 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "12px",
      top: "38px",
      cursor: "pointer",
      color: "#666",
      fontSize: "18px"
    }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
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