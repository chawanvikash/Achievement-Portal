
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom' ;
import ProtectedRoute from './content/ProtectedRoute';

import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import AlumniPage from './pages/AlumniPage';

import AcheiveAlumni from './pages/AcheiveAlumni';
import AcheiveFaculty from './pages/AcheiveFaculty';
import AcheiveStudents from './pages/AcheiveStudents';

function App() {
  return (
    <>
      
      
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/alumni" element={<AlumniPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/achievements/faculty" element={<AcheiveFaculty />} />
        <Route path="/achievements/students" element={<AcheiveStudents />} />
        <Route path="/achievements/alumni" element={<AcheiveAlumni />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

      </Routes>
    </>
  )
}

export default App