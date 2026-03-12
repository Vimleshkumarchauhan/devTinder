const express = require("express")

const app = express();


//-------------------------------- app.use routes ---------------------------
// app.get("/",(req,res)=>{
//     res.send("Inside the get request");
// })



// app.use("/test",(req,res)=>{
//     res.send("Inside the test page");
// });

// app.use("/test/hello",(req,res)=>{
//     res.send("ji namste kaise ho");
// });

// app.use("/",(req,res)=>{
//     res.send("Hello from Vimlesh");
// });


//------------------------------- app.use routes ----------------------------


app.get("/",(req,res)=>{
    res.send("Api using get !");
});

app.post("/test",(req,res)=>{
    res.send("api using the post request");
});

app.put("/hello",(req,res)=>{
    res.send("Working on the put request");
});

app.listen(3000,()=>{
    console.log("Server is started");
});