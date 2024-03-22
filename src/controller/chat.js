import ChatModel from '../model/chat.js'


const getAllChats = async(req,res)=>{
    try {
        let chats = await ChatModel.find({})
        res.status(200).send({
            message:"Messages Fetched Successfully",
            chats
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const createChat = async(req,res)=>{
try {
    let chat = await ChatModel.create(req.body)
    res.status(200).send({
        message:'New Chat Added',
        chat
    })
} catch (error) {
    res.status(500).send({
        message:error.message||"Internal Server Error"
    })
}    
}
const deleteChat = async(req,res)=>{
    try {
        let data = await ChatModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:'Chat Deleted',
            data
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }    
    }


export default{
    getAllChats,createChat,deleteChat
}