const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const router = express.Router();


/* /api/auth- prefix */
router.post("/register",async (req, res)=>{
    const {email, password} = req.body;

    const isUserExist = await userModel.findOne({email});

    if(isUserExist){
        return res.status(409).json({
            message: " user is already exist"
        })
    }
    const user = await userModel.create({email, password});
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.status(201).json({
        message: "user registered successfully",
        user
    })
})

router.post("/login", async(req, res)=>{
    const {email, password}= req.body;
    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({
            message : "user not found!"
        })
    }
    const isPasswordValid = password === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid Password"
        })
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.status(200).json({
        message: "user login successfully",
        user,
        token
    })
})
module.exports = router;