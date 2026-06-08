const User=require("../models/UserModel");

const signupUser = async(req,res) => {
    try{
        const { firstname,lastname,email,phone,password } = req.body;
        const NewUser = new User({
            firstname,
            lastname,
            email,
            phone,
            password,
        });
        const SavedUser = await NewUser.save();
        res.status(200).json({
            message:"User Registered successfully",
            data:SavedUser,
        });
    }

    catch(error){
        res.status(500).json({
            message:"Error Registering in User",
            error:error.message,
        });
    }
};

module.exports = {
    signupUser,
};