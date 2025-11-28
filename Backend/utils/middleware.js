const ExpressError = require('./ExpressError');
 
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new ExpressError(401, "You must be logged in to do that.");
  }
  next();
};
module.exports.isVerified=(req,res,next)=>{
  if(req.user.isVerified===false){
    throw new ExpressError(401, "You must be logged in to do that.");
  }
  next();

}


module.exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'staff') {
    throw new ExpressError(403, "Access Denied: You must be an administrator.");
  }
  next();
};