import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner, Container } from 'react-bootstrap';

function ProtectedRoute({ children }) {

  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <Container className="text-center mt-5" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" />
        <p>Checking authentication...</p>
      </Container>
    );
  }


  if (!isLoggedIn) {

    return <Navigate to="/login" replace />;
  }

 
  return children;
}

export default ProtectedRoute;