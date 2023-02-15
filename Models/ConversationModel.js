import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(

    {
        members:{
            type:Array,
        },
    },
    {
        timestamps:true,
    }
)

var ConversationModel = mongoose.model("Conversations" , conversationSchema);
export default ConversationModel;