import express from "express";
import { createPost, deletePost, getPost, getTimeLinePosts, likePost, updatePost } from "../Controller/PostController.js";
import multer from "multer";
const router = express.Router()

const upload = multer({ dest: 'public/images' })

router.get('/' , async (req, res) => {
    res.send("Post route");
})

router.get("/:id/timeline" , getTimeLinePosts)
router.post('/',upload.single("image") , createPost)
router.get('/:id' , getPost)
router.put('/:id' , updatePost)
router.delete('/:id' , deletePost)
router.put('/:id/like' , likePost)


export default router