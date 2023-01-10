import express from 'express';
const tripRouter = express.Router();
import tripControllers from "../controllers/trip.js"
import validateTripInput from '../Middleware/tripMiddleware.js';

tripRouter.get("/trips", tripControllers.getAll)
tripRouter.post("/trips",validateTripInput, tripControllers.createTrip)
tripRouter.get("/trips/:id",tripControllers.getTripById)
tripRouter.delete("/trips/:id",tripControllers.deleteTrip)
tripRouter.put("/trips/:id",tripControllers.updatedTrip)
tripRouter.get("/trips/origin/:origin",tripControllers.getTripByOrigin)
tripRouter.get("/trips/find/:origin/:originDate/:destination/:seats",tripControllers.findTrip)


export {tripRouter};