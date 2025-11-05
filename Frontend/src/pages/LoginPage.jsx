import React, { useState } from 'react';
import axios from 'axios';
import "../css/Register.css";
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import HomeBtn from '../includes/HomeBtn';


function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',  
  });
  const url="http://localhost:8080"

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

      // This will now work because the backend sends a response
      console.log('Success:', response.data.message);
      login(response.data.user); 
      
      // b. Redirect to the homepage
      navigate('/dashboard');
      
      
      setFormData({
        email: '',        
        password: '',
       
      });
      

    } catch (error) {
      
      console.error('Error Login user:', error.response.data.error);
      window.alert("Error Login user:");
     
    }
  };

  return (
    <>
    <HomeBtn/>
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
      </form>   
      </>
    
  );
}

export default LoginPage;