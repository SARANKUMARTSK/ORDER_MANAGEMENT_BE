import mongoose from "./index.js";

let chatSchema = new mongoose.Schema(
    {
        message:{
            type:String,
            required:[true,"Type Your Comment"]
        }
    },{
        collection:"chats",
        versionKey:false
    }
)

const chatsModel = mongoose.model('chats',chatSchema)

export default chatsModel