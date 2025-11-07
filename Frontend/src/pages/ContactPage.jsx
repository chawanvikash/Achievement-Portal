import NavBar from '../includes/NavBar';
import "../css/Contact.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';



function ContactPage(){
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url="http://localhost:8080";

  useEffect(() => {
   
    const fetchPosts = async () => {
      try {
        const response = await axios.get(url+'/api/ContactPage');
        setContacts(response.data);
        
      } catch (err) {
        
        setError(err.message);
      } finally {
       
        setLoading(false);
      }
    };

    fetchPosts(); 
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
    <div>
        <section className="contactpt">
            <div className="overview">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you. Get in touch with us today!</p>
            </div>
        </section>

        <section className="content">
            <div className="contact-form">
                <h2>Send us a Message</h2>
                <form>
                    
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>

            <div className="contact-info">
                <h2>Our Contact Information</h2>
                <p><strong>Address:</strong> Indian Institute of Engineering Science and Technology, Shibpur, Howrah, West Bengal, India</p>
                <p><strong>Phone:</strong> +91 12345 67890</p>
                <strong>Email:</strong><a href="#"> contacts@iiests.ac.in</a>
            </div>
        </section>

        <section className="action">
            <h2>Stay Connected</h2>
            <p>Follow us for the latest updates, news and achievements.</p>
            <form action="/register" method='get'>
              <button >Register</button>
            </form>
        </section>
    </div>
    </>
  );
 

}

export default ContactPage
