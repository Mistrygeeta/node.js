const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const cacheClient = require("../services/cache.service")


async function authMiddleware(req, res,next) {
    try {
        const token = req.cookies.ticket;

        if(!token){
            return res.status(404).json({
                message: "token not found, unauthorized"
            })
        };

        const isBlacklisted = await cacheClient.get(token)
        if(isBlacklisted){
            return res.status(401).json({
                message : "token blacklisted"
            })
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                message :" Invalid token"
            })
        };

        const user = await userModel.findById(decoded.id);

        req.user = user
        next()
    } catch (error) {
        console.log("error in middleware-->", error)
    }
    
}

module.exports = authMiddleware;