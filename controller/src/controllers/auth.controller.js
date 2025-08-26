const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


async function register(req, res) {
    const {email , password}= req.body;

    const isUserAlreadyExist = await userModel.findOne({email});

    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "user is already exist"
        })
    }
     const hashedPassword = await bcrypt.hash(password,10)
    const users = await userModel.create({
        email,
        password:hashedPassword
    })
  
    const token = jwt.sign({id: userModel._id},process.env.JWT_SECRET)
    res.status(201).json({
        message: "user registred successfully",
        users, 
        token
    })
}
async function login(req, res){
     const {email, password}= req.body;
     const users = await userModel.findOne({email});

     if(!users){
        return res.status(404).json({
            message : "user not found"
        })
     }

      const isPasswordValid = await bcrypt.compare(password, users.password);
      
      if(!isPasswordValid){
        return res.status(401).json({
            message : "Invalid Password"
        })
      }

      const token= jwt.sign({id: users._id},process.env.JWT_SECRET)

       res.status(200).json({
        message: "users logedin successfully!",
        users,
        token
       })
}

module.exports = {register,login}