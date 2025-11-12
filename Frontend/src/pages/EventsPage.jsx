import NavBar from '../includes/NavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



function EventsPage(){
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url="https://achievement-portal-backend.onrender.com"

  useEffect(() => {
   
    const fetchEvents = async () => {
      try {
        const response = await axios.get(url+'/api/EventsPage');
        setEvents(response.data);
        
      } catch (err) {
        
        setError(err.message);
      } finally {
       
        setLoading(false);
      }
    };

    fetchEvents(); 
  }, []); 

 
  if (loading) {
    return <p>Loading achievements...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return(
     <>
     <NavBar/>
     

        
     

      <section className="event">
        <div className="overview">
          <h1>Events and Fests</h1>
          <p>
            Vibrant celebrations and organized activities bring people together to
            share joyous experiences, foster unity, and showcase culture, music,
            art, and traditions
          </p>
        </div>
      </section>

      <section className="content">
        <h2>Cultural and Technical Fusion</h2>
        <div className="cards">
          <div className="card">
            <h3>REVELATION</h3>
            <p>
              Revelation is an annual technical and cultural festival organized
              by the Department of Computer Science and Technology at the Indian
              Institute of Engineering Science and Technology (IIEST), Shibpur.
              The event features a blend of technical competitions like Codestorm
              and RootAccess, and non-technical events such as gaming and
              treasure hunts, with a focus on providing career opportunities and
              internships through sponsorships.
            </p>
          </div>

          <div className="card">
            <h3>INSTRUO</h3>
            <p>
              INSTRUO, the Annual Technical Fest of IIEST, Shibpur, is all about
              “Driving Innovation.” From a modest and humble beginning in 2009 to
              becoming the largest Tech-Fest of Kolkata and the second largest
              in Eastern India, it has skyrocketed its way to being a signature
              event in Kolkata&apos;s &quot; technical &quot; calendars. This year
              “INSTRUO 2025 - THE 13TH EDITION”. So, be ready to witness the
              unique magnanimity of INSTRUO packed with a humongous number of
              events ranging from technical and high-end Robowars to beautiful
              and surreal literary contests.
            </p>
          </div>

          <div className="card">
            <h3>REBECCA</h3>
            <p>
              From the pulsating beats of the music to the kaleidoscope of colors
              lighting up the night sky. Here&apos;s to reliving those cherished
              moments and having a blast along the way!
            </p>
          </div>
        </div>
      </section>

      <section className="events">
        <h2>Events...</h2>
        <div className="collaboration">
          <h3>HACKATHON</h3>
          <p>
            Co-Innovation Centre is conducting a Hackathon, in collaboration
            with IIC and TCGTBI, among the students of IIEST, Shibpur. The broad
            theme is “Build a Service Robot”
            <br /><br />
            The Hackathon shall be conducted in two phases.
            <br /><br />
            The first phase shall incorporate the Software design. The actual
            prototype needs to be built in the Second stage. CiC will reimburse
            Maximum Rs. 15,000/- per team, for Prototype Development
          </p>
        </div>

        <div className="collaboration">
          <h3>AI and ML Workshop</h3>
          <p>
            Indian Institute of Engineering Science and Technology (IIEST),
            Shibpur (formerly BE College), is set to introduce a compulsory
            artificial intelligence (AI) and machine learning (ML) course for
            first-year students from the next academic session. The institute is
            also considering the introduction of two new PG programmes in AI and
            ML from the next academic session. These will be offered by the
            Computer Science and Technology Department and Information
            Technology Department .
          </p>
        </div>
      </section>

      <section className="Upcoming">
        <h2>Upcoming Events</h2>
        <ul>
          <li>Freshers Orientation---3rd September,2025</li>
          <li>Workshop on AI and ML---7th September,2025</li>
          <li>Hackathon 2025---13th September to 15th September,2025</li>
        </ul>
      </section>


    </>
  );
 

}

export default EventsPage
