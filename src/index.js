
// import requre modules;

const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

//import database

const collection = require("./config");
const { name } = require('ejs');
const exp = require('constants');

// express application

const app = express();

// convert data into json file

app.use(express.json());

// for urlencoded
app.use(express.urlencoded({extended:false}))

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


//for database 

app.post("/signup",async(req,res)=>{


   const data = {
    // it take the username and password from body and sent to database
    name:req.body.username,
    password:req.body.password

   }

//check is user exit then show message

const exitUser = await collection.findOne({name:data.name});

if(exitUser){
    res.send("User already exited try new name");
}
else{
//for saltRounds
const saltRounds = 10;

const hashPasword = await bcrypt.hash(data.password,saltRounds);

data.password = hashPasword;//replace the hashpasword with orignal password


     // sent data into database
    const userdata =  await collection.insertMany(data);
    console.log(userdata);
}

  
  
  
});

//for login

app.post("/login", async (req,res)=>{

    try{
        const check = await collection.findOne({name:req.body.username});
        if(!check){
            res.send("User Not found !");
        }

        //compare hash pasword with plane pasword in database

        const paswordMatch = await bcrypt.compare(req.body.password , check.password);

        if(paswordMatch){
            res.render("home");
        }
        else{
            res.send("Wrong password Try Again");
        }

    }

    catch{
        res.send("Wrong Detail");

    }
})

//for server running
const port = 5000;

app.listen(port,()=>{
    console.log("Server running at 5000")
})


