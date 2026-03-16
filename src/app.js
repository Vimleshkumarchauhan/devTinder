const express = require("express")

const {adminAuth,userAuth} = require("./middleware/auth");

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


//------------------------------- various app routes handlers ----------------------------


// app.get(/a/,(req,res)=>{
//     res.send({"first name":"Vimlesh ","last Name":"Kumar"});
// });

// app.post("/test",(req,res)=>{
//     res.send("api using the post request");
// });

// app.put("/hello",(req,res)=>{
//     res.send("Working on the put request");
// });



// ------------------------ Handling routes (Nested with the help of the next())-------

// app.get("/route",(req,res,next)=>{
//     console.log("In the route 1");
//     //res.send("Response 1");
//     next();
// },(req,res,next)=>{
//         console.log("In the route 2");
//         //res.send("Response 2");
//         next();
//     },
//     (req,res)=>{
//         console.log("In the route 3");
//         res.send("Response 3")
//     }
// );

//---------------------------------------------------------------------------------------------------

app.use("/admin",adminAuth);

app.post("/user/login",(req,res)=>{
    res.send("User Login successfully");
})

app.get("/user/getData",userAuth,(req,res)=>{
        res.send("user Data get successfully");
});


app.get("/admin/getData",(req,res)=>{
        res.send("Data get successfully");
});



app.delete("/admin/deleteData",(req,res)=>{
    res.send("Data deleted successfully");
});

app.listen(3000,()=>{
    console.log("Server is started");
});