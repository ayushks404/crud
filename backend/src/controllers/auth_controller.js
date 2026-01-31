import User from "../models/auth_model.js";
import bcrypt from "bcryptjs";
import generate_token from "../utils/generate_token.js";


export const register = async (req , res) => {

    const {email , name , password} = req.body;

    

    //get user from database
    const userexist = await User.findOne({
        email
    });


    //if exists
    if(userexist){
        return res.status(400).json({
            message : "user exists"
        });
    };

    //hasing passw
    const hash_password = await bcrypt.hash(password, 10);
    
    //creating user in db
    const user = await User.create({ name, 
        email, 
        password: hash_password 
    });

    res.status(201).json({
        _id : user._id,
        name : user.name,
        email : user.email,
        token : generate_token(user._id)
    });


};





//login
export const login = async (req,res) =>{
    const {email , password} = req.body;

    //finding user in db
    const user = await User.findOne({
        email
    });

    const b = await bcrypt.compare(password, user.password);

    if(!user || !b ){
        return res.status(400).json({
            message : "invalid user"
        });
    }


    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generate_token(user._id)
    });
};



//logout
export const logout = (req, res) => {

    res.json({ message: "Logged out successfully" });

};


