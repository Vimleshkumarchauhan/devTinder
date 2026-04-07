const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require("express")
const connectDB = require("./config/database")
const {validateSignUpData} = require("./utils/validaton");
const bcrypt = require("bcrypt");


const app = express();
const User = require("./models/user");
const { get } = require('node:http');

app.use(express.json());


//---------------vvvv---------Signup--------------------

app.post("/signup",async (req,res)=>{
    try{
        //validation of data
        validateSignUpData(req);

        const {firstName,lastName,emailId,password} = req.body;
        //encrypting the password
        const passwordHash = await bcrypt.hash(password,10);

        //creating the new user instance
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });


        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the user "+err.message);
    }

    
});


// Login API

app.post("/login",async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId});

        console.log("password = "+password);
        console.log("user password = "+user.password);
        

        const isPasswordValid = await bcrypt.compare(password,user.password);
        
        if (isPasswordValid){
            res.send("Login successful !");
        }else{
            throw new Error("Invalid credentials");
        }
    }catch(err){
            res.status(400).send("Error "+err.message);
        }
});

//--------------vvvvvvvvvvv Find user --------------

app.get("/user",async (req,res)=>{

    const userEmailId = req.body.emailId;
    
    try{
        const user = await User.find({emailId:userEmailId});
        if (user.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(user);
        }
        
    }catch{
        res.status(400).send("something went wrong");
    }
});


//Feed API - Feed/get the data from database.

app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch{
        res.status(400).send("Something went wrong");
    }
})

// finding the user with /userById GET api call

app.get("/userById",async (req,res)=>{

    const userId = req.body._id;
    
    try{
        const user = await User.findById(userId);
        res.send(user);
    }catch{
        res.status(400).send("Some error occured");
    }
});


// Delete API to delete the user

app.delete("/user",async (req,res)=>{

    const userId = req.body._id;

    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch{
        res.status(400).find("Something went wrong");
    }
});

//--- Find by ID and delete

// Find and update data ---------------------------
app.patch("/user/:userId",async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;


    try{

        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];

        const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));

        if (!isUpdateAllowed){
            throw new Error("Update is not allowed ");
        }

        if (data.skills.length>10){
            throw new Error("Skills can't be more than 10");
        }

        const user = await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"before",
            runValidators:true,
        });
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("UPDATE failed !"+err);
    }
});

// --^^^^^^^^^------------------Updating the data -------------------------------------^^^^^

connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log("Server is started");
});
}).catch(err=>{
    console.error("Database cannot be connected",err.message);
});

