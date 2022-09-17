const express = require("express");
const app = express();

const userRouter = require("./routes/userRoutes"); 
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const mongoose = require("mongoose");

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);





mongoose.connect("mongodb+srv://ABHI:1rgLK1SKF60O1lEF@cluster0.skx8q.mongodb.net/test")
.then(()=>{
  app.listen(7000,()=>{
    console.log("start")
  
  })

})
.catch((error)=>{

})
