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
    
    status: {type: String, default:"unread"},

    date: { type: Date, default: Date.now }
    
});

const Notification = model('Notification', notificationSchema);
module.exports=(Notification);
