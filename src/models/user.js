
const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
  username:{
    type:"string",
    require:true,

  },
  password:{
    type:"string",
    require:true
  },
  email:{
    type:"string",
    require:true,
    unique:true
  }
},{timeStamp:true})


module.exports=mongoose.model("user",userSchema)