import mongoose from "mongoose";

const messageSchema = mongoose.Schema(

    {
        conversationId:{
            type:String
        },
        sender:{
            type:String
        },
        text:{
            type:String
        }
    },
    {
        timestamps:true,
    }
)

var MessageModel = mongoose.model("Messages" , messageSchema);
export default MessageModel;