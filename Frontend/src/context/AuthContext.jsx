import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap'; 
import { BASE_URL } from '../helper';


const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const url=BASE_URL;

  
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
  
        const response = await axios.get(url+'/api/me');
        setUser(response.data.user); 
      } catch (err) {
        
        console.log('User not authenticated');
        setUser(null);
      } finally {
      
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []); 

 
  const login = (userData) => {
    setUser(userData);
  };

  
  const logout = async () => {
    try {
      await axios.post(url+'/api/logout');
      setUser(null);
    
      window.location.href = '/login'; 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

 
  const value = {
    isLoggedIn: !!user, 
    user,               
    login,             
    logout,             
    loading             
  };

  
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading Application...</p>
      </Container>
    );
  }

  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


export  function useAuth() {
  return useContext(AuthContext);
}
