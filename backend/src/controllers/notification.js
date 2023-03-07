
const Notification = require ("../mongo/schemas/notification.js")

const getAllNotifications = async(req,res) =>{
        try {
            const notifications = await Notification.find({destinatary: req.params.id})
            res.json(notifications);
            
        }catch (e){
                res.status(500).json({ message: e })
            }};

const readAllNotifications = async(req,res) =>{

    try {
        const notifications = await Notification.updateMany({destinatary: req.params.id, status:"unread"},{status:"read"})
        res.json(notifications);

    } catch (e) {
        res.status(500).json({ message: e })
        
        
    }
}
            
    module.exports={getAllNotifications,readAllNotifications}; 

