
// import requre modules;

const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

//import database

const collection = require("./config");
const { name } = require('ejs');
const exp = require('constants');
const allowedUsers = ["sp22-bcs-113", "fa23-bse-071"];

// express application

const app = express();

// convert data into json file

app.use(express.json());

// for urlencoded
app.use(express.urlencoded({ extended: false }))

// use ejs as view engine;

app.set('view engine', 'ejs');


// for static page
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));




app.get("/", (req, res) => {
    res.render("login", { message: null });

});
app.get("/home", (req, res) => {
    res.render("home", { message: null });

});

app.get("/signup", (req, res) => {
    res.render("signup", { message: null });
});


//for database 

app.post("/signup", async (req, res) => {


    const data = {
        // it take the username and password from body and sent to database
        name: req.body.username,
        password: req.body.password

    }

    if (!allowedUsers.includes(data.name)) {
        return res.render("signup", { message: "You are not allowed to register." });
    }

    //check is user exit then show message

    const exitUser = await collection.findOne({ name: data.name });

    if (exitUser) {
        // res.send("User already exited try new name");
        return res.render("login", { message: "User already exists, try a different username." });
    }
    else {
        //for saltRounds
        const saltRounds = 10;

        const hashPasword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashPasword;//replace the hashpasword with orignal password


        // sent data into database
        await collection.insertMany([data]);


        //  console.log(userdata);

        return res.render("signup", { message: " Your account sucessfully created" });



    }




});


//for login

app.post("/login", async (req, res) => {

    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.render("login", { message: "User Not Found" });
        }

        //compare hash pasword with plane pasword in database

        const paswordMatch = await bcrypt.compare(req.body.password, check.password);

        if (paswordMatch) {
            return res.render("home");
        }
        else {
            return res.render("login", { message: "Wrong Password Please Try Again" });
        }

    }

    catch {
        return res.render("login", { message: "You Fill Wrong Detail" });

    }
})

// app.get("/", (req, res) => {
//     res.render("login");

// });



//for server running
const port = 5000;

app.listen(port, () => {
    console.log("Server running at 5000")
})


