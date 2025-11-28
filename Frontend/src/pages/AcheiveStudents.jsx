import NavBar from '../includes/NavBar';
import "../css/Achievement.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import photo from "../assets/success.avif"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AcheiveStudents() {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url="http://localhost:8080";

  useEffect(() => { 
    const fetchPosts = async () => {
      try {  
        const response = await axios.get( url+'/api/AcheivementStudent');
        setPosts(response.data);
        console.log(response);
        
      }catch (err) {
        
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
 

  return (
    <>

     <NavBar/>
      
      <div className="posts">
        {posts.map(post => (
          
          <Card style={{ width: '18rem' }}  className='cards '>
            <Card.Img variant="top" src={photo}  className='success'/>
              <Card.Body>
              <Card.Title><h3>Title:{post.title}</h3></Card.Title>
              <Card.Text>
                <div key={post._id} className="post" >            
                  <h4>Name:{post.user.username}</h4>
                  <p>Descp:{post.body}</p>
                  <p>Role:{post.user.role}</p>
                  Posted on: {new Date(post.createdAt).toLocaleDateString()}

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

export default AcheiveStudents;
