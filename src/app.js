const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require("express")

const connectDB = require("./config/database")

const app = express();

const User = require("./models/user");

app.use(express.json());

app.post("/signup",async (req,res)=>{


    const user = new User(req.body);

    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the user "+err.message);
    }

    
});

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


connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log("Server is started");
});
}).catch(err=>{
    console.error("Database cannot be connected",err.message);
});

