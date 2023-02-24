const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
     },
    passenger: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    messege: {type: String},
    
    status: {type: String, default:"unread"},

    date: { type: Date, default: Date.now }
    
});

const Notification = model('Notification', notificationSchema);
module.exports=(Notification);
