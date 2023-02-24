
const Notification = require ("../mongo/schemas/notification.js")

const getAllNotifications = async(req,res) =>{
        try {
            const notifications = await Notification.find({owner: req.params.id})
            res.json(notifications);
            
        }catch (e){
                res.status(500).json({ message: e })
            }};
            
    module.exports={getAllNotifications};

