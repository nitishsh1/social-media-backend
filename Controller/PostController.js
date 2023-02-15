import PostModel from '../models/PostModel.js';
import mongoose from 'mongoose';
import UserModel from '../Models/userModel.js';

//create a new Post
export const createPost = async (req, res) => {
    console.log(req.body , req.file);
    const {userId , desc} = req.body; 
    let newPost
    try {
        if(req.file === undefined){
            newPost = new PostModel({userId, desc })
        }else{
            const {filename} = req.file;
           newPost = new PostModel({userId, desc ,image: filename});
        }
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get a post

export const getPost = async (req, res) => {
    const id  = req.params.id

    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.statue(500).json(error)

    }
}

//update a post 

export const updatePost = async (req, res) => {
    const postId = req.params.id
    const {userId} = req.body
    try {
        const post = await PostModel.findById(postId)
        if(post.userId === userId) {
            await post.updateOne({$set:req.body})
            res.status(200).json("post updated");
        }else{
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.statue(500).json(error)

    }
}

//delete a post 
export const deletePost = async (req, res)=>{
    const id = req.params.id
    const {userId} = req.body

    try {
        const post = await PostModel.findById(id)
        if(post.userId===userId){
            await post.deleteOne()
            res.status(200).json("post deleted");

        }else{
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.statue(500).json(error)

    }
}

//like and dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id
    const {userId} = req.body
    try {
        const post = await PostModel.findById(id)
        if(!post.likes.includes(userId)){
            await post.updateOne({$push:{likes:userId}})
            res.status(200).json("Post liked")
        }else{
            await post.updateOne({$pull:{likes:userId}})
            res.status(200).json("Post unliked")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
}


//get timeline post
export const getTimeLinePosts = async (req, res) => {
 
   
    const userId =  req.params.id;

    try {
        const currentUserPosts = await PostModel.find({userId})
        const followingPosts = await UserModel.aggregate([
            {
                $match:{
                    _id: mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from: "posts",
                    localField:"following",
                    foreignField:"userId",
                    as:"followingPosts"
                }
            },
            {
                $project:{
                    followingPosts:1,
                    _id:0
                }
            }
        ])

        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
        }))
    } catch (error) {
        res.status(500).json(error.message)

    }
}