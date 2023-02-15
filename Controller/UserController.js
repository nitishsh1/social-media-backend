import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

// Get all users
export const getAllUsers = async (req, res) => {

  try {
    let users = await UserModel.find();
    
    users = users.map((user)=>{
      const {password, ...otherDetails} = user._doc
      return otherDetails
    })
   
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};


//get a User
export const getUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};




// update a user
export const udpateUser = async (req, res) => {
  console.log(req.files ,req.body);
  const id = req.params.id;

  const { _id} = req.body;
  const currentUserId = _id

  if (id === currentUserId) {
    try {
      let user;
      if(req.files[0]&&req.files[1]){
       user = await UserModel.findByIdAndUpdate(id, {$set:req.body , coverPicture: req.files[1]?req.files[1].filename:"" , profilePicture: req.files[0]?req.files[0].filename:""}, {
          new: true,
        });
      }else if(req.files[0]){
        user = await UserModel.findByIdAndUpdate(id, {$set:req.body , profilePicture:req.files[0].filename}, {
          new: true,
        });
      }else if(req.files[1]){
        user = await UserModel.findByIdAndUpdate(id, {$set:req.body , coverPicture:req.files[1].filename}, {
          new: true,
        });
      }else{
        user = await UserModel.findByIdAndUpdate(id, {$set:req.body}, {
          new: true,
        });
      }
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied! you can only update your own porfile");
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied! you can only update your own porfile");
  }
};

//follow a user
export const followUser = async (req, res) => {
    const id = req.params.id;

    const {_id} = req.body

    const currentUserId = _id
    if(currentUserId === id) {
        res.status(403).json("Action forbidden");
    }
    else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if(!followUser.followers.includes(currentUserId)){
                 await followUser.updateOne({$push:{followers:currentUserId}})
                 await followingUser.updateOne({$push:{following:id}})
                 res.status(200).json('User followed')
            }else{
                res.status(403).json('User is already followed by you')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

//unfollow a user
export const unFollowUser = async (req, res) => {
    const id = req.params.id;

    const {_id} = req.body
    const currentUserId = _id
    if(currentUserId === id) {
        res.status(403).json("Action forbidden");
    }
    else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if(followUser.followers.includes(currentUserId)){
                 await followUser.updateOne({$pull:{followers:currentUserId}})
                 await followingUser.updateOne({$pull:{following:id}})
                 res.status(200).json('User unFollowed')
            }else{
                res.status(403).json('User is not followed by you')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}