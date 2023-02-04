const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
    owner: {type: String},
    origin:  {type: String},
    originDate: {type:Date},
    destination:  {type: String},
    destinationDate: {type:Date},
    seats:{type: Number},
    price:{type: Number},
    availableSeats:{type: Number},
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "Booking"
     }]
});

const Trip = model('Trip', tripSchema);
module.exports=(Trip);