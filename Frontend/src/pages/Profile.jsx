import { useState } from 'react'
import { Routes, Route } from 'react-router-dom' ;
import DashAchievement from './DashAchievement';
import ProfileSidebar from '../includes/ProfileSideBar';
import { useAuth } from '../context/AuthContext';
import {Row,Col } from 'react-bootstrap';
import HomeBtn from '../includes/HomeBtn';
import DashAdminUser from './DashAdminUser';

import "../css/Profile.css";

function Profile(){
    const { user } = useAuth(); 
    return(
        <>
            
          <HomeBtn/>
          <div className='welcome'>
                <Row >
                <Col md={12}>
          
                <h2>Welcome, {user.username}!</h2>
                <p>This is your personal dashboard. You can manage your Profile here.</p>
                </Col>
                </Row>
            </div>    
                <ProfileSidebar/>

      
            <Routes>
                <Route path='/MyAchievement' element={<DashAchievement/>}></Route>
                <Route path='/pendingUsers' element={<DashAdminUser/>}></Route>
                <Route path='/pendingAcheivements' element={<DashAchievement/>}></Route>


            </Routes>

        </>
    );

}

export default Profile