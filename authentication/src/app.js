const express = require("express");
const authRoutes = require("./routes/auth.route");
const userRouter = require("./routes/user.route")
const app = express()

app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter)
module.exports = app;