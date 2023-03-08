const express = require('express');
const bookingRouter = express.Router();
const bookingControllers = require('../controllers/booking.js');

bookingRouter.get('/booking', bookingControllers.bookGetAll);
bookingRouter.post('/booking', bookingControllers.bookTrip);
bookingRouter.get('/booking/:id', bookingControllers.getSpecificBooking);
bookingRouter.delete('/booking/:id', bookingControllers.deleteTrip);
module.exports = {bookingRouter};