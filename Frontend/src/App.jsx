
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom' ;
import ProtectedRoute from './content/ProtectedRoute';
import { useEffect } from "react";
import { BASE_URL } from "./helper";
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
import AcheiveInstitute from './pages/AcheiveInstitute';
import DashAdminUser from './pages/DashAdminUser';
import DashAdminAcheivements from './pages/DashAdminAcheivements';
import VerifyEmailPage from './pages/VerifyEmailPage';

import AchievementDetail from './pages/AchievementDetail';
import AdminReviews from './pages/AdminReviews';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  useEffect(() => {
    fetch(`${BASE_URL}/api/ping`)
      .then(() => console.log("Backend awake"))
      .catch(() => console.log("Ping failed"));
  }, []);
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
        <Route path="/achievements/Institute" element={<AcheiveInstitute />} />
        <Route path="/achievements/:id" element={<AchievementDetail />} />
        <Route path="/dashboard/*" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/MyAchievement" element={<DashAchievement />} />
        <Route path="/pendingUsers" element={<DashAdminUser />} />
        <Route path="/pendingAcheivements" element={<DashAdminAcheivements />} />
        <Route path="/reviews" element={<AdminReviews />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />



      </Routes>
    </>
  )
}

export default App