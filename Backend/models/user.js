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
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String
  },
  otpExpires: {
    type: Date
  },
  isVerified:{
    type:Boolean,
    default:false,
  }
}, {
  timestamps: true, 
});

userSchema.plugin(passportLocalMongo, { usernameField: 'email' })
const User = mongoose.model('User', userSchema);
module.exports = User;










