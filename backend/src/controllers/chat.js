const Users = require ("../mongo/schemas/user.js");
const Chat = require ("../mongo/schemas/chat.js");
const Message = require ("../mongo/schemas/message.js")


const GetAllChats = async (req,res) =>{
    try {
        const allMyChats = await Chat.find({participants: req.payload.id}).populate([{
            path: 'participants', select: 'firstName treatment surname email picUrl',
            model: 'Users',      
        }])
        res.status(200).json(allMyChats)
    } catch (error) {
        res.status(500).json({error: error})
    }
}
const createChat = async (req,res) =>{
    const me = req.payload.id;
    const userMember = req.body.member;
    try{
        const existsChat = await Chat.findOne({participants : [userMember,me]}) 
            if(existsChat){
                return res.status(400).json({message: "this chat it is already declared"})
            }
            const chat = new Chat({participants: [ userMember,me] })
                await chat.save()
                return res.status(200).json(chat)  
    }catch(error){
        res.status(500).json({error : error.message})
    }

}
const getOne = async (req,res) =>{
    try{
     const chat  = await Chat.findById(req.params.id)
     .populate([{
        path: 'participants', select: 'firstName treatment surname email picUrl',
        model: 'Users',      
    }])
    .populate([{
        path: 'message',
        model: 'Message',
        populate:  [
            { path: 'sender', select: 'firstName surname email picUrl',
              model :'Users',
            },
        ],
    }])
     res.status(200).json(chat);
    }catch(error){
        res.status(500).json({error : error.message})
    }
}

const deleteOne = async (req,res) =>{
    try{
        const chat  = await Chat.findByIdAndDelete(req.params.id)
        res.status(204).json({message : ""})
    }catch(error){
        res.status(500).json({error : error.message})
    }
}
module.exports= {GetAllChats,createChat,getOne,deleteOne}