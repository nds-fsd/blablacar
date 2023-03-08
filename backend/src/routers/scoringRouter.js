const express = require('express');
const scoringRouter = express.Router();
const scoringControllers = require('../controllers/scoring.js');
const { jwtTokenVerify } = require('../Middleware/jwtMiddleware.js');

scoringRouter.get('/scoring/createAlert', scoringControllers.createAlert);
// scoringRouter.post('/scoring/:id',jwtTokenVerify, scoringControllers.postBookingScore);
// scoringRouter.get('/scoring/booking/:id',jwtTokenVerify, scoringControllers.getSpecificBooking);
module.exports = {scoringRouter};
