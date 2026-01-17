const router = require('express').Router();
const User  = require('../models/user.js'); 
const Post  = require("../models/post.js");
const Review=require("../models/review.js");
const { isLoggedIn, isAdmin } = require('../utils/middleware.js'); 
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');


router.get('/pending-users', isLoggedIn, isAdmin, wrapAsync(async (req, res) => {
  const pendingUsers = await User.find({ $and:[{isVerified:false},{isEmailVerified:true}] })
    .sort({ createdAt: 1 });  
  res.json(pendingUsers);
}));

router.get('/pending-achievements', isLoggedIn, isAdmin, wrapAsync(async (req, res) => {
  const pendingPost = await Post.find({isVerified:false}).populate("user","username role")
    .sort({ createdAt: 1 });   
  res.json(pendingPost);
}));



router.put('/users/:userId/approve', isLoggedIn, isAdmin, wrapAsync(async (req, res) => {
  const { userId } = req.params;  
  const user = await User.findById(userId);
  if (!user) {
    throw new ExpressError(404, "User not found.");
  }
  // Flip the switch!
  user.isVerified = true;
  await user.save(); 
  res.json({ message: `User ${user.username} has been approved.`, user: user });
}));


router.delete('/users/:userId/reject', isLoggedIn, isAdmin, wrapAsync(async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new ExpressError(404, "User not found.");
  }
  res.json({ 
    message: `User ${deletedUser.username} has been rejected and removed.`, 
    user: deletedUser 
  });
}));


router.put('/achievements/:postId/approve', isLoggedIn, isAdmin, wrapAsync(async (req, res) => {
  const { postId } = req.params;  
  const post = await Post.findById(postId);
  if (!post) {
    throw new ExpressError(404, "Post not found.");
  }
  // Flip the switch!
  post.isVerified = true;
  await post.save();  
  res.json({ message: `User Achievemt has been approved.`, post: post });
}));

router.get("/reviews",isLoggedIn,isAdmin, wrapAsync(async (req, res) => {   
    const reviews = await Review.find({}).sort({ createdAt: -1 }); 
    res.json(reviews);
}));


router.delete("/reviews/:id",isLoggedIn,isAdmin, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);   
    if (!deletedReview) {
      throw new ExpressError(404, "Review not found");
    }
    res.status(200).json({ message: "Review deleted successfully" });
}));

module.exports = router;