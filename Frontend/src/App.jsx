
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom' ;
import ProtectedRoute from './content/ProtectedRoute';

import HomePage from './pages/HomePage';
import AchievementsPage from './pages/AchievementPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <>
      
      
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/alumni" element={<HomePage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/achievements/faculty" element={<HomePage />} />
        <Route path="/achievements/students" element={<AchievementsPage />} />
        <Route path="/achievements/alumni" element={<HomePage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

      </Routes>
    </>
  )
}

export default App