import NavBar from '../includes/NavBar';
import "../css/Achievement.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Footer from '../includes/Footer';
import photo from "../assets/icon.jpg";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../helper';
import { Spinner } from 'react-bootstrap';
function AcheiveFaculty() {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url=BASE_URL;

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
   return (
     <div
       className="d-flex flex-column justify-content-center align-items-center"
       style={{ minHeight: '70vh' }}
     >
       <Spinner animation="border" variant="primary" role="status" />
       <span className="mt-3 fw-bold text-primary">Loading achievements...</span>
     </div>
   );
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

              <Card.Img variant="top" src={post?.image?.url ?? photo}  className='success' />
              <p className='role'>-{post.user.role}</p>
              <Card.Text>
                <div key={post._id} className="post" >
                  
                  <h4 className='name'>{post.user.username}</h4>
                  <p className='desp'>{post.body}</p>

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

export default AcheiveFaculty
