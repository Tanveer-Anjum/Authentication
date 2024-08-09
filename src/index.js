
// import requre modules;

const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

// express application

const app = express();


// use ejs as view engine;
 
app.set('view engine','ejs');


// for static page
app.use(express.static("public"));

app.get("/",(req, res)=>{
    res.render("login");

});

app.get("/signup",(req,res)=>{
    res.render("signup");
});


//for server running
const port = 5000;

app.listen(port,()=>{
    console.log("Server running at 5000")
})


