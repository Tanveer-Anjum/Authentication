// import database


const mongoose = require("mongoose");

// make connection with database
const connect = mongoose.connect("mongodb://localhost:27017/Login");

// for check is database connect or not
connect.then(()=>{
    console.log("database connect successfully");
})
.catch(()=>{
    console.log("database cannot be connected")
});

//create a schema

const LoginSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

  

});

//create model / collection

const collection = new mongoose.model("User",LoginSchema);

module.exports = collection;

