
const Notification = require ("../mongo/schemas/notification.js")

const getAllNotifications = async(req,res) =>{
        try {
            console.log(req.params);
            const notifications = await Notification.find({destinatary: req.params.id},{deleted:false})
            res.status(200).json(notifications);
            
        }catch (e){
                res.status(500).json({ message: e })
            }};

const patchNotifications=async(req, res) => {
                const updateNoti=await Notification.findByIdAndUpdate(req.params.id,req.body)
                const updatedNoti=await Notification.findById(req.params.id)
                console.log("UpdateNoti: ",updatedNoti)
                res.status(200).json(updatedNoti);
            };

const delNotifications=async(req, res) => {
                const updateNoti=await Notification.findByIdAndDelete(req.params.id,req.body)
                
                res.status(200).json({"message":"Notification deleted"});
            };

    module.exports={getAllNotifications , patchNotifications , delNotifications};

