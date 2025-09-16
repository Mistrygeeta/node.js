require("dotenv").config();
const app = require("./src/app")
const cacheClient = require("./src/services/cache.service")
const connectDB = require("./src/config/db/db")

connectDB()
cacheClient.on("connect",()=>{
   console.log("Redis connected successfully")
});

cacheClient.on("error", (error)=>{
    console.log("error in connecting Redis", error)
})

const PORT = process.env.PORT || 4500
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})