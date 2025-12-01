import NavBar from '../includes/NavBar';
import "../css/Achievement.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import photo from "../assets/success.avif"
import Footer from '../includes/Footer';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AcheiveFaculty() {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url="http://localhost:8080";

  useEffect(() => { 
    const fetchPosts = async () => {
      try {  
        const response = await axios.get( url+'/api/AcheivementFaculty');
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
     {posts.length===0 ? (<p className='noPost'><i class="fa-chisel fa-regular fa-alarm-clock"></i> &nbsp; No post available Yet!</p>) :
      <div className="posts">
      
        {posts.map(post => (
          <Card style={{ width: '18rem' }}  className='cards'>
            
              <Card.Body>
              <Card.Title><h3>{post.title}</h3></Card.Title>

              <Card.Img variant="top" src={photo}  className='success' />
              <p className='role'>-{post.user.role}</p>
              <Card.Text>
                <div key={post._id} className="post" >
                  
                  <h4 className='name'>{post.user.username}</h4>
                  <p className='desp'>{post.body}</p>

                </div>
              </Card.Text>
            
             Posted on: {new Date(post.createdAt).toLocaleDateString()}
          </Card.Body>
    </Card>

          
        ))}
      </div>
}<Footer/>
      </>
    
  );
}

export default AcheiveFaculty
