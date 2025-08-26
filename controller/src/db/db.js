const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
      console.log("DB connected successfully")})
      .catch((error)=>{
        console.error(error);
      })
}

module.exports = connectDB