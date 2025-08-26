const userModel = require("../models/user.model")

async function profile(req, res){
    const users = await userModel.findOne({_id: req.user.id});

    res.status(200).json({
        message: "profile fetched successfully",
        users
    })

}


module.exports = {profile}