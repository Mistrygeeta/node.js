const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

router.get("/profile", async(req , res)=>{
  const {token}= req.body || {}

  if(!token){
    return res.status(401).json({
        message: "token is not provided"
    })
  }

  try {
    const decoded= jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    const user = await userModel.findOne({_id: decoded.id})
    console.log(user)
    res.status(200).json({
        message: "profile fetched successfully",
        user,
        token
    })
  } catch (err) {
    return res.status(401).json({
        message :" Invalid token"
    })
  }
})


module.exports = router;