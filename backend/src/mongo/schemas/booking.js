const { Schema, model } = require ('mongoose');

const bookingSchema = new Schema({
    passenger: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    bookedTrip: {
        type: Schema.Types.ObjectId,
        ref: "Trip"
    }
});

const Bookings = model('Booking', bookingSchema);
module.exports=(Bookings);

