const express = require("express");
const authRouter = require("./routes/auth.route")
const userRoutes = require("./routes/user.route")
const app = express()


app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/user", userRoutes)
module.exports = app;