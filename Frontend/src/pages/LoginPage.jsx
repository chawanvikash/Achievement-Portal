import React, { useState } from 'react';
import axios from 'axios';
import "../css/Register.css";
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import HomeBtn from '../includes/HomeBtn';
import { Alert } from 'react-bootstrap';


function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error,setError]=useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',  
  });
  const url="https://achievement-portal-backend.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        url+'/api/login',
        formData
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
    <HomeBtn/>
     {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
    <form onSubmit={handleSubmit} className='register-form'>
      <h2>Login</h2>
      <div className="input-group">
          <label htmlFor="ipemail">Email-Address</label>
          <input id='ipemail' type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        </div>

        <div className="input-group">
          <label htmlFor="ippass">Password</label>
          <input id='ippass' type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
        </div>
        <button type="submit" className='sub-btn'>Login</button> 
        <br /> <br />
        <p style={{textDecoration:"underline"}}>New Account</p>
        <form action="/register" method='get'>
              <button className='reg-btn'>Register</button>
        </form> 
      </form>   
      </>
    
  );
}

export default LoginPage;
