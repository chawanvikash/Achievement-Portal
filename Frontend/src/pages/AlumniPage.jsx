import NavBar from '../includes/NavBar';
import "../css/Alumni.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import photo from "../assets/icon.jpg"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AlumniPage() {
  
  const [alums, setAlums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url="http://localhost:8080";

  useEffect(() => { 
    const fetchAlum = async () => {
      try {  
        const response = await axios.get( url+'/api/AlumniPage');
        setAlums(response.data);
        console.log(response);
        
      }catch (err) {
        
        setError(err.message);
      } finally { 
       
        setLoading(false);
      }
    };

    fetchAlum(); 
  }, []); 

 
  if (loading) {
    return <p>Loading achievements...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }
 

  return (
    <>

     <NavBar/>
     
     <section className="alum">
        <div className="overlay">
          <h1>Our Proud Alumni</h1>
          <p>Meet the achievers who once walked the corridors of IIEST Shibpur</p>
        </div>
      </section>

      <div className="posts-list">
      
        {alums.map(alum => (
          <Card  className='cards'>
            <Card.Img variant="top" style={{width:"5rem",height:"5rem"}} src={photo}  className='success'/>
              <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>
                <div key={alum._id} className="post" >
                  <h4>Name:{alum.username}</h4>
                  <p>Descp:Good network</p>
                  <p>Role:{alum.role}</p>

                </div>
              </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
    </Card>

          
        ))}
      </div>
      </>



      
    
  );
}

export default AlumniPage;