const router = require('express').Router();
const { User,Post } = require('../models/user.js'); 
const { isLoggedIn, isAdmin } = require('../utils/middleware.js'); 
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');


router.get('/pending-users', isLoggedIn, isAdmin, wrapAsync(async (req, res) => {

  const pendingUsers = await User.find({ isVerified: false })
    .sort({ createdAt: 1 });
    
  res.json(pendingUsers);
}));

router.get('/pending-achievements', isLoggedIn, isAdmin, wrapAsync(async (req, res) => {

  const pendingPost = await Post.find({ isVerified: false }).populate("user","username role")
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

module.exports = router;