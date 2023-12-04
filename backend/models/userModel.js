const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:{type:String,required:true}, 
  password:{type:String,required:true}, 
  confirmPassword:{type:String,required:true}, 
},{versionkey:false});

const User = mongoose.model('user', userSchema);

module.exports = User;
