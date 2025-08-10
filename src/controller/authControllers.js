const User = require("../models/User");

const signupController = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({message:"Email is already registered"});
        }
        const uploadUser = await User.create({
            email:email,
            password:password
        });
        return res.status(200).json({message:"User created Successfully",data:{email: uploadUser.email}})
    } catch(err){
        return res.status(500).json({message:`Error while creating user: ${err}`});
    }
}

const loginController = (req,res) => {
    // const 
}

module.exports = {
    signupController,
    loginController
}