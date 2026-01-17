const mongoose = require('mongoose');
const User=require("./user.js")
const Schema = mongoose.Schema;


const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true 
  },
  body: {
    type: String,
    required: true
  },
  image:{
    filename:String,
    url:String,
    
  }, 
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',                 
    required: true
  },
  isVerified:{
    type:Boolean,
    default:false,
  }
  
}, {
  timestamps: true 
});

const Post = mongoose.model('Post', postSchema);
module.exports=Post;