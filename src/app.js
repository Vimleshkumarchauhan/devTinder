const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require("express")

const connectDB = require("./config/database")

const app = express();

const User = require("./models/user");

app.use(express.json);

app.post("/signup",async (req,res)=>{

    console.log(req.body);
    res.send("Data added");

    // const user = new User({
    //     firstName:"MS",
    //     lastName:"Dhone",
    //     emailId:"MSdhoni@gmail.com",
    //     password:"DhoniBhai@123",
    // });

    // try{
    //     await user.save();
    //     res.send("User added successfully");
    // }catch(err){
    //     res.status(400).send("Error saving the user "+err.message);
    // }

    
})

connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log("Server is started");
});
}).catch(err=>{
    console.error("Database cannot be connected",err.message);
});

