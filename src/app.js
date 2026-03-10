const express = require("express")

const app = express();

// app.get("/",(req,res)=>{
//     res.send("Inside the get request");
// })

app.get("/",(req,res)=>{
    res.send("Inside the get request");
});

app.get("/test",(req,res)=>{
    res.send("Inside the test page");
});

app.get("/test/hello",(req,res)=>{
    res.send("ji namste kaise ho");
});


app.listen(3000,()=>{
    console.log("Server is started");
}
);