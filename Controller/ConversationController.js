import ConversationModel from '../Models/ConversationModel.js'


//new conversation
export const createConversation =  async (req, res) => {
    console.log(req.body);
    const {senderId , receiverId} = req.body
    const newConversation = new ConversationModel({
        members:[senderId ,receiverId]
    })

    try {

        const oldConversation = await ConversationModel.findOne({members:{$all : [senderId , receiverId ]}})
        console.log("out old conversation" , oldConversation);
        if(oldConversation){
            console.log("old conversation" , oldConversation);
            res.status(200).json([oldConversation, receiverId])
        }else{
            const savedConversation = await newConversation.save()
            res.status(200).json([savedConversation, receiverId])
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}


// get conversation
export const getConversation = async (req, res) => {
    
    const senderId = req.params.userId
    const receiverId = req.params.personId

    console.log("getting conversation" ,senderId , receiverId );
    try {
        const conversation = await ConversationModel.findOne({members:{$all : [senderId , receiverId ]}})

        console.log("getting conversation",conversation);

        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
}