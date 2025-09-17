const express = require("express");
const router = express.Router();
const {registerController,loginController,logoutController} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/home",authMiddleware,(req, res)=>{
    return res.status(200).json({
        message : "im home route"
    })
})
router.post("/register", registerController)
router.post("/login",loginController)
router.post("/logout", logoutController)
module.exports = router