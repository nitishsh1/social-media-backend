import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Registering a new user
export const registerUser = async(req , res) =>{

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashedPass;
    const newUser = new UserModel(req.body);
    const {username} = req.body
    try {

        const oldUser =  await UserModel.findOne({username})

        if(oldUser){
            return res.status(400).json({message:"username is already registered"})
        }
        const user = await newUser.save();

        const token = jwt.sign({
            username:user.username , id:user._id
        },process.env.JWt_KEY , {expiresIn:'1h'})
        res.status(200).json({user,token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//login user

export const loginUser = async (req, res) => {
    const {username , password} = req.body;

    try {
        const user = await UserModel.findOne({username: username})

        if(user){
            const validity  = await bcrypt.compare(password, user.password)
            
            if(!validity){
                res.status(400).json("Wrong Password")
            }
            else{
                const token = jwt.sign({
                    username:user.username , id:user._id
                },process.env.JWt_KEY , {expiresIn:'1h'})

                res.status(200).json({user,token})
            }
        }else{
            res.status(404).json("User does not exist")
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



// import dotenv from "dotenv";

// export const logoutUser = async (req, res) => {
    
   
//     dotenv.config();
//     const secret = process.env.JWT_KEY;
//     const {token} = req.body
//       try {
        
//         if (token) {
//           const decoded = jwt.verify(token, secret);
//           console.log(decoded)
//          res.json("success")
//         }
        
//       } catch (error) {
//         console.log(error);
//         res.json("failed")
//       }
    
    
// }