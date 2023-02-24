const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	sender: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
    content:  {type: String},
    chat: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chat'}],
},
{timestamps: { createdAt: 'createdAt'}});
const Message = mongoose.model('Message', messageSchema);
module.exports=(Message);