import Trip from "../mongo/schemas/trip.js";

const getAll = async (req, res) => {
   const allTrips = await Trip.find();
    res.status(200).json(allTrips)
}

const createTrip = async(req,res) =>{
    const newTrip = new Trip(req.body);
    req.body.originDate = new Date();
    req.body.destinationDate = new Date();
    await newTrip.save();
    res.status(201).json(newTrip);
}

const getTripById = async(req,res) =>{
    try{
        const trip = await Trip.findById(req.params.id);
        res.status(200).json(trip); 
    }catch(error){
        res.status(404).send({message : "id not found"})
    }
}
const deleteTrip = async(req,res) =>{
    try{
        const trip = await Trip.findByIdAndDelete(req.params.id);
        res.status(200).json(trip)
    }catch(error){
        res.status(404).send({message : "id not found"})
    }
}
const updatedTrip = async(req,res) =>{
    try{
        const trip = await Trip.findByIdAndUpdate(req.params.id, req.body);
        const updatedTrip =await Trip.findById(req.params.id)
        res.status(200).json(updatedTrip);
    }catch(error){
        res.status(404).send({message : "id not found"})
    } 

}
const getTripByOrigin = async(req,res) => {
    try{
        const trip = await Trip.find({ origin: req.params.origin});
        res.status(200).json(trip); 
    }catch(error){
        res.status(404).send({message : "origin not found"})
    }
}

export default {getAll,createTrip,getTripById,deleteTrip,updatedTrip,getTripByOrigin};