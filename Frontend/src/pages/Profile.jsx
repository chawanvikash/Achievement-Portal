import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import DashAchievement from './DashAchievement';
import ProfileSidebar from '../includes/ProfileSideBar';
import { useAuth } from '../context/AuthContext';
import { Container } from 'react-bootstrap';
import DashAdminUser from './DashAdminUser';
import AdminReviews from './AdminReviews';
import "../css/Profile.css";


function Profile(){
    const { user } = useAuth(); 
    return(
        <div className="dashboard-layout">
    
            <ProfileSidebar/>

            <main className="dashboard-main">
                <Container fluid="md">
                 
                    <div className='welcome-section'>
                        <div className="welcome-text">
                            <h2 className='welcome-title'>Welcome back, {user ? user.username : 'User'}!</h2>
                            <p className='welcome-subtitle'>Access your personal dashboard and manage your profile settings below.</p>
                        </div>
                    </div>    
                    
                   
                    <div className="dashboard-content">
                        <Routes>
                            <Route path='/MyAchievement' element={<DashAchievement/>}></Route>
                            <Route path='/pendingUsers' element={<DashAdminUser/>}></Route>
                            <Route path='/pendingAcheivements' element={<DashAchievement/>}></Route>
                            <Route path='/reviews' element={<AdminReviews/>}></Route>
                        </Routes>
                    </div>

                </Container>
            </main>

        </div>
    );
}

export default Profile;