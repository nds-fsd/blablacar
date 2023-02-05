const express = require('express');
const bookingRouter = express.Router();
const bookingControllers = require('../controllers/booking.js');

bookingRouter.get('/booking', bookingControllers.bookGetAll);
bookingRouter.post('/users/:idUser/booking/:idTrip', bookingControllers.bookTrip);
bookingRouter.get('/booking/:id', bookingControllers.getSpecificBooking);
bookingRouter.delete('/booking/:id', bookingControllers.deleteTrip);
module.exports = {bookingRouter};