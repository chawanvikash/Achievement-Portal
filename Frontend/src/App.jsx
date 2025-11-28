
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom' ;
import ProtectedRoute from './content/ProtectedRoute';

import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashAchievement from './pages/DashAchievement';
import EventsPage from './pages/EventsPage';
import AlumniPage from './pages/AlumniPage';
import Profile from './pages/Profile';
import AcheiveAlumni from './pages/AcheiveAlumni';
import AcheiveFaculty from './pages/AcheiveFaculty';
import AcheiveStudents from './pages/AcheiveStudents';
import DashAdminUser from './pages/DashAdminUser';
import DashAdminAcheivements from './pages/DashAdminAcheivements';

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
        <Route path="/dashboard/*" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/MyAchievement" element={<DashAchievement />} />
        <Route path="/pendingUsers" element={<DashAdminUser />} />
        <Route path="/pendingAcheivements" element={<DashAdminAcheivements />} />



      </Routes>
    </>
  )
}

export default App