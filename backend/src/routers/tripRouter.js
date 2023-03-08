const express = require ('express');
const tripRouter = express.Router();
const tripControllers = require ("../controllers/trip.js");
const { jwtTokenVerify } = require('../Middleware/jwtMiddleware.js');
const validateTripInput = require ('../Middleware/tripMiddleware.js');

tripRouter.get("/trips", tripControllers.getAll)
tripRouter.post("/trips", tripControllers.findTrip)
tripRouter.get("/trips/:id", tripControllers.getTripById)
//este se tendria que borrar, luego miramos bien.
tripRouter.post('/users/:id/newtrip', jwtTokenVerify, tripControllers.createTrip);
// para borrar despues
tripRouter.post('/users/:id/testnewtrip', jwtTokenVerify, tripControllers.testCreateTrip)
//_____________________
tripRouter.delete("/trips/:id",jwtTokenVerify, tripControllers.deleteTrip)
tripRouter.put("/trips/:id",jwtTokenVerify, tripControllers.updatedTrip)
tripRouter.get("/trips/origin/:origin",tripControllers.getTripByOrigin)
tripRouter.get("/findtrips", tripControllers.getTripCoordinates)



module.exports = {tripRouter};
