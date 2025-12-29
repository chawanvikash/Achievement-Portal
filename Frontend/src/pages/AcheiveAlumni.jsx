import NavBar from '../includes/NavBar';
import "../css/Achievement.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import photo from "../assets/success.avif"
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Footer from '../includes/Footer';

function AcheiveAlumni() {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url="http://localhost:8080";

  useEffect(() => { 
    const fetchPosts = async () => {
      try {  
        const response = await axios.get( url+'/api/AcheivementAlumni');
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
     {posts.length===0 ? (<p className='noPost'><i class="fa-chisel fa-regular fa-alarm-clock"></i> &nbsp; Posts are not Published Yet!</p>) :
      <div className="posts">
      
        {posts.map(post => (
          <Card style={{ width: '18rem' }}  className='cards'>
            
              <Card.Body>
              <Card.Title><h3>{post.title}</h3></Card.Title>
              <Card.Img variant="top" src={photo}  className='success'/>
              <Card.Text>
                <div key={post._id} className='post'>
                  
                  <h4>Name:{post.user.username}</h4>
                  <p>Descp:{post.body}</p>
                   
                  <p className='role'>-{post.user.role}</p>

                </div>
              </Card.Text>
              <Link to={`/achievements/${post._id}`}>
           <Button variant="primary" className="w-100 mt-3">
             Read Full Story <FaArrowRight className="ms-1"/>
           </Button>
        </Link>
            
           
            Posted on: {new Date(post.createdAt).toLocaleDateString()}
          </Card.Body>
    </Card>

          
        ))}
      </div>
}<Footer/>
      </>
    
  );
}

export default AcheiveAlumni;
