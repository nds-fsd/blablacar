const Trip = require ("../mongo/schemas/trip.js");
const Users = require ("../mongo/schemas/user");

const getAll = async (req, res) => {
   const allTrips = await Trip.find().populate([{
    path: 'owner',select: 'firstName treatment surname email',
    model: 'Users',
}])
    res.status(200).json(allTrips)
}

const createTrip = async(req,res) =>{
    console.log(req.body);
    const id = req.params.id
    const newTrip = new Trip(req.body);
    console.log(newTrip);
    req.body.originDate = new Date().toLocaleDateString('es-ES');
    req.body.destinationDate = new Date().toLocaleDateString('es-ES');

    newTrip.owner = id;
    newTrip.availableSeats = newTrip.seats;
    await newTrip.save();
    res.locals.body = newTrip;
    const trip = res.locals.body;
    try {
        if (!id) return res.status(404).json();
        const user = await Users.findById(id);
        if (user.idTrips.includes(trip)) return res.status(400).json({ message: "ya existe el viaje" })
        user.idTrips.push(trip)
        await user.save()
        return res.status(200).json(trip)
    } catch (e) {
        res.status(500).json({ message: e })
    }
}

// test create trip

const testCreateTrip = async(req, res) => {
    const idUser = req.params.id // recogemos la id del usuario
    const bodyTrip = req.body

try{
    const user = await Users.findById(idUser)
    if(!user) return res.json({error: 'No User Found'})
    if(user){
        const newTrip = new Trip(bodyTrip)
        newTrip.originDate = new Date().toLocaleDateString('es-ES');
        newTrip.destinationDate = new Date().toLocaleDateString('es-ES');
        newTrip.owner = idUser;
        newTrip.availableSeats = newTrip.seats;
        const trip = await newTrip.save();
        console.log('este es el viaje creado'+ trip)
        res.status(201).json(trip)  
    }
}catch(e){
    console.log('error creando el trip' + e)
}


}

const getTripById = async(req,res) =>{
    try{
        const trip = await Trip.findById(req.params.id).populate([{
            path: 'owner',select: 'firstName treatment surname email picUrl',
            model: 'Users',
        }])
        .populate([{
            path: 'bookings',
            model: 'Booking',
            populate:  [
                { path: 'passenger', select: 'firstName surname email picUrl'},
            ],
        }])
        if(trip.length === 0){
            res.status(404).send({message : "id not found"})
        }
        res.status(200).json(trip); 
    }catch(error){
        res.status(500).send({message : ""})
    }
}
const deleteTrip = async(req,res) =>{
    try{
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if(trip.length === 0){
            res.status(404).send({message : "id not found"})
        }
        res.status(200).json(trip)
    }catch(error){
        res.status(500).send({message : ""})
    }
}
const updatedTrip = async(req,res) =>{
    try{
        const trip = await Trip.findByIdAndUpdate(req.params.id, req.body);
        const updatedTrip =await Trip.findById(req.params.id)
        if(trip.length === 0){
            return res.status(404).send({message : " id not found"})
        }
        res.status(200).json(updatedTrip);
    }catch(error){
        res.status(500).send({message : ""})
    } 

}
const getTripByOrigin = async(req,res) => {
    try{
        const trip = await Trip.find({ origin: req.params.origin});
        if(trip.length === 0){
            return res.status(404).send({message : " Trip not found"})
        }
        res.status(200).json(trip); 
    }catch(error){
        res.status(500).send({message : ""})
    }
}
// const findTrip = async(req,res) =>{
//     try{
//         const trip = await Trip.find({origin: req.params.origin,originDate: { $gte: req.params.originDate },destination: req.params.destination,seats: { $gte: req.params.seats }}).sort({originDate: 1});
//         if(trip.length === 0){
//             return res.status(404).send({message : " Trip not found"})
//         }
//         res.status(200).json(trip);
//     }catch(error){
//         res.status(500).send({message : ""})
//     }
// }

const findTrip = async(req,res) =>{
    try{
        let queryCond = {}
        if(req.body.origin){
           queryCond.origin={$regex:req.body.origin,$options:"i"};
        }
        if(req.body.originDate){
           queryCond.originDate=req.body.originDate;
        }
        if(req.body.destination){
           queryCond.destination={$regex:req.body.destination,$options:"i"};
        }
        if(req.body.seats){
            queryCond.seats={$gte:req.body.seats};
         }
         const trip = await Trip.find(queryCond).populate([{
            path: 'owner',select: 'firstName treatment surname email picUrl',
            model: 'Users',
        }])
        .populate([{
            path: 'bookings',
            model: 'Booking',
            populate:  [
                { path: 'passenger', select: 'firstName surname email picUrl'},
            ],
        }]);
         console.log(trip);
        if(trip.length === 0){
            return res.status(404).send({message : " Trip not found"})
        }
        res.status(200).json(trip);
    }catch(error){
        res.status(500).send({message : ""})
    }
}

module.exports={getAll,createTrip,getTripById,deleteTrip,updatedTrip,getTripByOrigin,findTrip, testCreateTrip};