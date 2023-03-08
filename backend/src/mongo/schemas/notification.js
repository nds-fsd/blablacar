const { Schema, model } = require('mongoose');
const notificationSchema = new Schema({
    destinatary:{
        type: Schema.Types.ObjectId,
        ref: "User"
     },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {type: String},
    body: {type: String},
    
    read: {type: Boolean, default:false},

    deleted:{type: Boolean, default:false},

    date: { type: Date, default: Date.now }
    
});

const Notification = model('Notification', notificationSchema);
module.exports=(Notification)

