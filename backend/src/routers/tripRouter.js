import express from 'express';
const tripRouter = express.Router();
import Trip from "../mongo/schemas/trip.js";

tripRouter.get('/trip', async (req, res) => {
    const allTrips = await Trip.find();
    console.log(allTrips)
    res.status(200).json(allTrips);
});

tripRouter.post('/trip', async (req, res) => {
    const body = req.body;
    req.body.originDate = new Date();
    req.body.destinationDate = new Date();
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json(newTrip);
});
tripRouter.get('/trip/:id', async (req, res) => {
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
});





export {tripRouter};