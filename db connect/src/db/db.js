require("dotenv").config()
const mongoose = require("mongoose");


function connectDB(){
    mongoose.connect(`mongodb+srv://mern14:${process.env.PASSWORD}@cluster0.presvox.mongodb.net/node`)
    .then(()=>{
        console.log("DB is connected")
    })
    .catch((err) =>{
      console.log(err)
    })
}
module.exports = connectDB;