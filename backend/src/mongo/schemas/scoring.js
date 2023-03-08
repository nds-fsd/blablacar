const { Schema, model } = require('mongoose');

const scoringSchema = new Schema({
    scoredUser:{
        type: Schema.Types.ObjectId,
        ref: "scoredUser"
     },
    scorer: {
        type: Schema.Types.ObjectId,
        ref: "scoreUser"
    },
    score: {type: Number, min:1, max:5},
    bookingID:{
        type: Schema.Types.ObjectId,
        ref: "booking"
    }
});

const Score = model('Score', scoringSchema);
module.exports=(Score);
