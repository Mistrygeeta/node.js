const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



async function registerController(req, res) {
    try {
        const {name, email,mobile, password}= req.body;

        const isUserExist = await userModel.findOne({email});
        if(isUserExist){
            return res.status(409).json({
                message:"user alredy exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser  = await userModel.create({
            name,
            email,
            mobile,
            password: hashedPassword
        })

        const token =jwt.sign({id: user_id},process.env.JWT-SECRET,{
            expiresIn:"1h"
        });

        res.cookie("ticket", token)

        return res.status(201).json({
            message : "user created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
    
};



module.exports = {registerController}