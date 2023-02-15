import express from 'express'
import { createConversation, getConversation } from '../Controller/ConversationController.js'
const router = express.Router()

router.post('/' ,createConversation)
router.get('/:userId/to/:personId' , getConversation)
export default router