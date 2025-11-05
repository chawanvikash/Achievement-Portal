import NavBar from '../includes/NavBar';
import '../css/HomePage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
 
  const [message, setMessage] = useState("");
  const url="http://localhost:8080"

  useEffect(() => {
    
    axios.get(url+'/api/HomePage')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data:", error);
        setMessage("Could not load data");
      });
  }, []);
 
  return (
    <>
    <NavBar/>
    <div className='homepage'>
     
    
      <section className="hero">
        <div className="overview">
         
          <p>Celebrating excellence in academics, research, innovation, and culture at IIEST Shibpur.</p>
        </div>
      </section>

      <section className="content">
        <h2>Highlights</h2>
        <div className="cards">
          <div className="card">
            <h3>Academic Excellence</h3>
            <p>Consistently ranked among the top institutes in India, with students excelling in GATE, UPSC, and global placements.</p>
          </div>
          <div className="card">
            <h3>Research & Innovation</h3>
            <p>Recognized for pioneering work in renewable energy, AI, and sustainable technologies with over 500+ publications annually.</p>
          </div>
          <div className="card">
            <h3>Global Presence</h3>
            <p>Alumni contributing to organizations like Google, Microsoft, ISRO, NASA, and leading global universities.</p>
          </div>
        </div>
      </section>

      <section className="achievements-list">
        <h2>Notable Achievements</h2>
        <ul>
          <li>1. Ranked in top 10 engineering research institutes in India (2024).</li>
          <li>2. Students won national awards in Smart India Hackathon & robotics competitions.</li>
          <li>3. MoUs signed with MIT, Stanford, and NUS for collaborative research.</li>
          <li>4. Published 50+ patents and innovations in the past 5 years.</li>
          <li>5. Excellence in sports & cultural fests at national and international level.</li>
        </ul>
      </section>

      <section className="action">
        <h2>Be a Part of Our Journey</h2>
        <p>Join us in achieving milestones and shaping the future of technology and society.</p>
        <form action="/register" method='get'>
          <button >Register</button>
        </form>
      </section>
   
   
    </div>
    </>
  );
}

export default HomePage;