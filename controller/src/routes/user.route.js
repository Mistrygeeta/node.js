const express = require("express");
const router = express.Router()
const jwt = require("jsonwebtoken")
const userController = require("../controllers/user.controller")

router.get("/profile",(req, res, next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Invalid token"
        })
    }
    try{const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
       return res.status(401).json({
        message: "unauthorized, Invalid token"
       })
    }

},userController.profile)

module.exports = router;