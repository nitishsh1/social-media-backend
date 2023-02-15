import express from 'express';
import { deleteUser, followUser, getAllUsers, getUser, udpateUser, unFollowUser } from '../Controller/UserController.js';
import multer from "multer";
import authMiddleWare from '../Middleware/AuthMiddlewars.js';
const router = express.Router();
const upload = multer({ dest: 'public/images' })

router.get('/' , getAllUsers)

router.get('/:id', getUser);
router.put('/:id',authMiddleWare ,upload.array("files") ,udpateUser);
router.delete('/:id',authMiddleWare, deleteUser);
router.put('/:id/follow',authMiddleWare ,followUser);
router.put('/:id/unfollow',authMiddleWare,unFollowUser);

export default router;