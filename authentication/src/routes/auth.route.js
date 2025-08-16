const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const router = express.Router();


/* /api/auth- prefix */
router.post("/register", async(req, res)=>{
    const {email,password} = req.body;

    const isUserExists = await userModel.findOne({email})

    if(isUserExists){
      return res.status(409).json({
        message: "user is already exists"
       })
    }

    const user = await userModel.create({
        email, password
    })

    const token = jwt.sign({id:user._id},
        process.env.JWT_SECRET)

    res.status(201).json({
        message: "user created successfully",
        user,
        token
    })
    
})

module.exports = router;