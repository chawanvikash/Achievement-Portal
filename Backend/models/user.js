const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongo=require("passport-local-mongoose");

const userSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  role: { 
    type: String, 
    required: true, 
    enum: ['student', 'faculty', 'alumni', 'staff'], 
    default: 'student'
  }
}, {
  timestamps: true, 
});

userSchema.plugin(passportLocalMongo, { usernameField: 'email' })
const User = mongoose.model('User', userSchema);

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
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',                 
    required: true
  }
  
}, {
  timestamps: true 
});

const Post = mongoose.model('Post', postSchema);

module.exports = {Post,User};










