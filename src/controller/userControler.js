const userModel=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const user = require("../models/user")
// const express= require("express")
const SECRET_KEY="NOTESAPI"
const signup= async (req,res)=>{
  //existing user
  //hashed password
  //user create
  //token ganerate
  try{
  const {email,password}=req.body
 
    const existingUser= await userModel.findOne({email:email})
    
    if(existingUser){
      return res.status(400).json({massage:"email already exist"})
    }
   
    const hashedPassword= await bcrypt.hash(password,10)
    req.body.password=hashedPassword

    const result=await userModel.create(req.body)

    const token=jwt.sign({email:result.email,id:result._id},SECRET_KEY)
    res.status(201).send({user:result,token:token})

  }catch(error){
    console.log(error)
    res.status(201).json({massage:"somthing wrong"})

  }



}
const signin= async(req,res)=>{
  const {email,password}=req.body
 try{
   const existingUser= await userModel.findOne({email:email});
   console.log(existingUser)
   if(!existingUser){
     return res.status(404).json({massage:"user not exist on this email"})

   }
  const matchpassword= await bcrypt.compare(password,existingUser.password);
  // console.log(matchpassword)
  if(!matchpassword){
     return res.status(400).json({massage:"Invalid password"})

    }
   const token=jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY)
   res.status(201).json({user:existingUser,token:token})

  }catch(error){
     console.log(error)
     res.status(500).json({massage:"somthing want wrong"})
  }


 }

module.exports={signup,signin}