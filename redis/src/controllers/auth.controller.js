const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cacheClient = require("../services/cache.service")


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

        const token =jwt.sign({id: newUser._id},process.env.JWT_SECRET,{
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


async function loginController(req, res) {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(422).json({
                message : "All field are required"
            })
        };

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                message : "user not found"
            })
        };
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(401).json({
                message : "inavlid credentials"
            })
        }

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{
            expiresIn: "1h"
        })
        res.cookie("ticket", token)

        return res.status(200).json({
            message : "user logged in successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error"
        })
    }
    
};

async function logoutController(req, res) {
    try {
        const token = req.cookies.ticket;

        if(!token){
            return res.status(401).json({
                message : " token not provided"
            })
        };

        await cacheClient.set(token, "blacklisted")

        res.clearCookie("ticket")
        return res.status(200).json({
            message : "user logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error"
        })
        
    }
    
};
module.exports = {registerController,loginController,logoutController}