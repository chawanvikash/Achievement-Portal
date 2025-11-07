import React, { useState } from 'react';
import axios from 'axios';
import "../css/Register.css";
import HomeBtn from '../includes/HomeBtn';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function RegisterPage() {
  const navigate=useNavigate();
  const [error,setError]=useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student'
  });
  const url="http://localhost:8080"

  const handleChange = (e) => {
  
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        url+'/api/register',
        formData
      );

    
      console.log('Success:', response.data.message);
      
      
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'student'
      
      });
      navigate("/login");
      

    } catch (error) {
      
      const errorMessage = error.response?.data?.error || 'Invalid email or password.';
      console.error('Error Registring user:', errorMessage);
      setError(errorMessage); 
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'student'
      
      });
      

    }
  };

  return (

    <>
    <HomeBtn/>
     {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

    <form onSubmit={handleSubmit} className='register-form'>
      <h2>Register</h2>
      <div className="input-group">
          <label htmlFor="ipname">Username</label>
          <input id='ipname' type="text" name="username" placeholder="Full Name" value={formData.username} onChange={handleChange} required/>
        </div>

        <div className="input-group">
          <label htmlFor="ipemail">Email-Address</label>
          <input id='ipemail' type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        </div>

        <div className="input-group">
          <label htmlFor="ippass">Password</label>
          <input id='ippass' type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
        </div>

        <div className="input-group">
          <label htmlFor="role-select">Role</label>
          <select id="role-select" name="role" onChange={handleChange} value={formData.role} className='opts' required>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="alumni">Alumni</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <button type="submit" className='sub-btn'>Register</button>
        <br />
        <p style={{textDecoration:"underline"}}>Account Exited!</p>
        <form action="/login" method='get'>
              <button className='reg-btn'>login</button>
        </form> 
        

      </form>
      </>
    
    
  );
}

export default RegisterPage;