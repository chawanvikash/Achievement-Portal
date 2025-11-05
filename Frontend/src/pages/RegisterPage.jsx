import React, { useState } from 'react';
import axios from 'axios';
import "../css/Register.css";
import HomeBtn from '../includes/HomeBtn';

function RegisterPage() {
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
      window.alert(" Account registerd Succesfully,Please Login!");

    } catch (error) {
      // This will now receive the error from the backend
      console.error('Error registering user:', error.response.data.error);
      window.alert("Username or Email has Already taken!");

    }
  };

  return (

    <>
    <HomeBtn/>
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
        

      </form>
      </>
    
    
  );
}

export default RegisterPage;