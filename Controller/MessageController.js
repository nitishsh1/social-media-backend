import MessageModel from '../models/MessageModel.js'


//add messages
export const addMessage = async(req, res)=>{
    console.log("22222 ",req.body);
    const newMessage = new MessageModel(req.body)

    try {
        const savedMessage = await newMessage.save()
        console.log("saved message" , savedMessage);
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get messages
export const getMessage = async(req, res)=>{
    try {
        const messages = await MessageModel.find({
            conversationId: req.params.conversationId
        })

        console.log("messages" , messages);
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
}