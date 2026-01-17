const router = require('express').Router();
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })
const Post  = require('../models/post.js');
const { isVerified,isLoggedIn } = require('../utils/middleware');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');


router.get('/myposts', isLoggedIn,isVerified, wrapAsync(async (req, res) => {
  const posts = await Post.find({ user: req.user._id })
    .populate('user', 'username role')
    .sort({ createdAt: -1 }); 
  res.json(posts);
}));

router.post('/posts', isLoggedIn,isVerified,upload.single('image'), wrapAsync(async (req, res) => {
  const { title, body } = req.body; 
  if (!title || !body) {
    throw new ExpressError(400, "Title and body are required.");
  }
  let verified=false;
  if(req.user.role==="staff"){
    verified=true;
  }
  const newPost = new Post({
    title,
    body,
    isVerified:verified,
    user: req.user._id 
  });
  if (req.file) {
            newPost.image = {
                url: req.file.path,      
                filename: req.file.filename 
            };
        }
  await newPost.save();
  await newPost.populate('user', 'username role'); 
  res.status(201).json(newPost);
}));


router.put('/posts/:postId', isLoggedIn,isVerified,upload.single('image'), wrapAsync(async (req, res) => {
  const { postId } = req.params;
  const { title, body } = req.body;
  const post = await Post.findById(postId);
  if (!post) throw new ExpressError(404, "Post not found.");
  if (!post.user.equals(req.user._id)) {
    throw new ExpressError(403, "You are not authorized to edit this post.");
  }
  if(post.title!==title || post.body!==body){
    if(req.user.role==="staff"){
      post.isVerified=true;
    }
    else{
        post.isVerified=false;
    }    
  } 
  post.title = title;
  post.body = body;
  if(req.file){
    url=req.file.path;
    filename=req.file.filename;
    post.image={url,filename};
  };
  
  await post.save();
  await post.populate('user', 'username');
  res.json(post);
}));


router.delete('/posts/:postId', isLoggedIn,isVerified, wrapAsync(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) throw new ExpressError(404, "Post not found.");
  if (!post.user.equals(req.user._id)) {
    throw new ExpressError(403, "You are not authorized to delete this post.");
  }
  await Post.findByIdAndDelete(postId);
  res.json({ message: "Post deleted successfully." });
}));

module.exports = router;