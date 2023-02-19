const Chat = require ("../mongo/schemas/chat.js");
const Message = require ("../mongo/schemas/message.js")

const createMessage = async (req,res) =>{
    const sender = req.payload.id
    const chat = req.body.chat
    try{
        const myChat = await Chat.findById(chat)
        if(myChat){
            const newMessage = new Message({
                content :req.body.content, 
                chat:req.body.chat,
                sender: req.payload.id,});
            myChat.message.push(newMessage)
            await newMessage.save()
            await myChat.save()
            res.status(201).json(newMessage)
        }else{
            res.status(404).json({error: "id doesn't exists"})
        }
    }catch(error){
         res.status(500).json({error : error.message})
    }
}

module.exports= {createMessage}