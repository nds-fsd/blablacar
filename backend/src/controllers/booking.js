const Booking  =  require("../mongo/schemas/booking.js");
const Trip  =  require("../mongo/schemas/trip.js");
const Users = require ("../mongo/schemas/user.js");
const Notification = require ("../mongo/schemas/notification.js")

const bookGetAll=async (req, res) => {
    const book = await Booking.find();
    console.log(book);
    res.json(book);
};
const bookTrip = async(req,res) =>{
    const {idUser,idTrip} = req.params
    try{
        if(!idUser) return res.status(400).json({message: "No hay usuario establecido"});
        if(!idTrip) return res.status(400).json({message: "No hay viaje establecido"});
        const user = await Users.findById(idUser);
        const trip = await Trip.findById(idTrip);
        if(idUser == trip.owner) return res.status(400).json({message: "No puedes reservar en tu propio viaje!"})
        if(trip.availableSeats === 0) return res.status(400).json({message: "No hay plazas en este viaje!"})
            const book = new Booking({
                passenger: idUser,
                bookedTrip: idTrip,
            });

            const notification = new Notification({
                owner: trip.owner,
                passenger: idUser,
                messege: "Tienes una nueva reserva",
    
            });
            console.log(trip.owner);
            console.log(idUser);
            user.bookedTrips.push(book)
            trip.bookings.push(book)

            await book.save()
            await user.save()
            await trip.save()
            await notification.save()

            const updatedTrip = await Trip.findById(idTrip);
            updatedTrip.availableSeats = updatedTrip.seats - updatedTrip.bookings.length;
            await updatedTrip.save()
            res.status(201).json(book)   
    }
    catch (e){
        res.status(500).json({ message: e })
    }

}
const getSpecificBooking = async  (req,res) =>{
    const id = req.params.id
    try{
        const book =  await Booking.findById(id).populate([{
            path: 'passenger',
            select: 'firstname surname email',
        }])

        res.status(200).json(book)

    }catch(error){
        res.status(500).json({message: error})
    }
}
const deleteTrip =  async (req,res) =>{
    const id = req.params.id
    try{
        const book  = await Booking.findByIdAndDelete(id)
        res.status(200).json({message:"booking borrado"})
    }catch(error){
        res.status(500).json({message: error})
    }
}

module.exports={bookTrip,bookGetAll,getSpecificBooking,deleteTrip}