const fs = require("fs");
const mongoose = require("mongoose");
const express = require("express");
const {signupUser} = require("./controllers/user.controller");
const {loginUser} = require("./controllers/user.controller");
const {validateLogInData} = require("./validators/login.user.validate");
const {validateSignupData} = require("./validators/signup.user.validate");
const {isTokenValid, isStudent } = require("./middlewares/index");
const { isTeacher}= require("./middlewares/index");



const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.post("/signup", validateSignupData, signupUser);
server.post("/login", validateLogInData,loginUser);
server.post("/signup", isTokenValid);
server.post("/login", isTokenValid);


server.get("/Teacher", isTeacher, isTokenValid, (req,res) =>{
    try{
        res.status(200).json({message: "welcome to Teacher's App"});
    } catch (error){
        console.log(error );
        res.status(500).json({message: " server error"});
    }
});

server.get("/Student", isStudent, (req,res) =>{
    try{
        res.status(200).json({message: "welcome to Student's App"});
    } catch (error){
        console.log(error );
        res.status(500).json({message: " server error"});
    }
});

server.all("/", (req, res)=>{
    try {
        res.status(200).json({message: "welcome to our server"});
    } catch (error) {
        console.log(error); 
        res.status(500).json({message: "server error"});  
    }
})

server.all("*", (req,res)=>{
    try {
        res.status(404).json({message: "page not found"}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"})
    }
})


server.listen(8686, async () =>{
    try {
        console.log( "server listening on port 8686"); 
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("db connected");
    } catch (error) {
        console.log(error);
        
    }
   
   
});
