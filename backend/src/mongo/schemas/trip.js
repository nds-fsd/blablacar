const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
    owner:[{
        type: Schema.Types.ObjectId,
        ref: "User"
     }],
    origin:  {type: String},
    originDate: {type:String},
    destination:  {type: String},
    departureTime: {type:String},
    arrivalTime: {type:String},
    seats:{type: Number},
    price:{type: Number},
    originLocation: {
        type: {type: String},
        coordinates: []
      },
    destinationLocation: {
        type: {type: String},
        coordinates: []
    },
    availableSeats:{type: Number},
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "Booking"
     }],
    scoringNotified:{type:Boolean, default:false}
});

const Trip = model('Trip', tripSchema);
module.exports=(Trip);