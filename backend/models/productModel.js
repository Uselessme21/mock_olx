const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
    name: {type:String,required:true}, 
    description : {type:String,required:true}, 
    category : {type:String,required:true}, 
    image : {type:String,required:true}, 
    location : {type:String,required:true}, 
    postedAt :{type:Date,required:true}, 
    price: {type:Number,required:true}, 
},{versionkey:false});

const Ad= mongoose.model('Ad', AdSchema);

module.exports = Ad;
