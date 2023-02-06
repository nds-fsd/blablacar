const express = require ('express');
const tripRouter = express.Router();
const tripControllers = require ("../controllers/trip.js");
const { jwtTokenVerify } = require('../Middleware/jwtMiddleware.js');
const validateTripInput = require ('../Middleware/tripMiddleware.js');

tripRouter.get("/trips", tripControllers.getAll)
tripRouter.post("/trips",jwtTokenVerify, validateTripInput, tripControllers.createTrip)
tripRouter.get("/trips/:id",jwtTokenVerify, tripControllers.getTripById)
tripRouter.delete("/trips/:id",jwtTokenVerify, tripControllers.deleteTrip)
tripRouter.put("/trips/:id",jwtTokenVerify, tripControllers.updatedTrip)
tripRouter.get("/trips/origin/:origin",tripControllers.getTripByOrigin)
//tripRouter.get("/trips/find/:origin/:originDate/:destination/:seats",tripControllers.findTrip)
tripRouter.post("/trips/find", tripControllers.findTrip)


/*tripRouter.get('/trip', async (req, res) => {
    const allTrips = await Trip.find();
    console.log(allTrips)
    res.status(200).json(allTrips);
});
tripRouter.post('/trip', async (req, res) => {
    const newTrip = new Trip(req.body);
    req.body.originDate = new Date();
    req.body.destinationDate = new Date();
    await newTrip.save();
    res.status(201).json(newTrip);
});
/*tripRouter.get('/trip/:id', async (req, res) => {
    try{
        const trip = await Trip.findById(req.params.id);
        res.status(200).json(trip); 
    }catch(error){
        res.status(404).send({message : "id not found"})
    }
});
tripRouter.delete('/trip/:id', async (req, res) => {
    try{
        const trip = await Trip.findByIdAndDelete(req.params.id);
        res.status(200).json(trip) 
    }catch(error){
        res.status(404).send({message : "id not found"})
    }
});
tripRouter.put('/trip/:id',  async(req, res) => {
    try{
        const trip = await Trip.findByIdAndUpdate(req.params.id, req.body);
        const updatedTrip =await Trip.findById(req.params.id)
        res.status(200).json(updatedTrip);
    }catch(error){
        res.status(404).send({message : "id not found"})
    }      
});
tripRouter.get('/trip/origin/:origin',  async(req, res) => {
    try{
        const trip = await Trip.find({ origin: req.params.origin});
        res.status(200).json(trip); 
    }catch(error){
        res.status(404).send({message : "origin not found"})
    }
});*/


module.exports = {tripRouter};