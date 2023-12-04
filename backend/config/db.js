const mongoose = require('mongoose');
const Mongo= process.env.MongoDBURI

const connection= mongoose.connect(Mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log("connected to DB"))
.catch((err)=>{
    console.log({message:"something went wrong",err})
});


module.exports=connection