const Booking  =  require("../mongo/schemas/booking.js");
const Trip  =  require("../mongo/schemas/trip.js");
const Users = require ("../mongo/schemas/user.js");
const Notification = require ("../mongo/schemas/notification.js")
const dateWorks = require ('../utils/dateWorks.js')

const bookGetAll=async (req, res) => {
    const book = await Booking.find();
    console.log(book);
    res.json(book);
};
const bookTrip = async(req,res) =>{
    console.log(req.query);
    const {user,trip}= req.query
    try{
        if(!user) return res.status(400).json({message: "No hay usuario establecido"});
        if(!trip) return res.status(400).json({message: "No hay viaje establecido"});
        const bookUser = await Users.findById(user);
        const bookTrip = await Trip.findById(trip).populate([{
            path:"bookings",
            model:'Booking',
            populate:[
                {path:'passenger', select: '_id'}
            ]
        }]);
        console.log(bookTrip.bookings);
        let foundID=false;
        bookTrip.bookings.find(e=>{
        let idToFind=""+e.passenger._id
        console.log(idToFind);
        idToFind.includes(user)?foundID=true:""
        })
        console.log("foundID es"+ foundID);
        
        
        if (foundID) return res.status(401).json({message:"Usuario ya registrado para ese viaje."})
        if(bookUser === bookTrip.owner) return res.status(400).json({message: "No puedes reservar en tu propio viaje."})

        if(bookTrip.availableSeats === 0) return res.status(400).json({message: "No hay plazas en este viaje!"})
            const book = new Booking({
                passenger: user,
                bookedTrip: bookTrip,
            });

            let originDate=new Date(bookTrip.originDate);
            let diaSalida= dateWorks.diaSemana(originDate);
            let mesSalida= dateWorks.mesFecha(originDate)
            console.log(bookTrip.owner);
            const notification = new Notification({
                destinatary: bookTrip.owner,
                sender: bookUser._id,
                title: "Tienes una nueva reserva",
                body: `El usuario ${bookUser.firstName} ha efectuado una reserva de tu viaje a ${bookTrip.destination} con fecha el ${diaSalida}, ${originDate.getDate()} de ${mesSalida} `
    
            });
            console.log(bookTrip.owner);
            console.log(user);
            bookUser.bookedTrips.push(book)
            bookTrip.bookings.push(book)

            await book.save()
            await bookUser.save()
            await bookTrip.save()
            await notification.save()

            const updatedTrip = await Trip.findById(trip);
            console.log("update seats")
            console.log(updatedTrip);
            updatedTrip.availableSeats = updatedTrip.seats - updatedTrip.bookings.length;
            await updatedTrip.save()
            res.status(201).json({message:"Reserva efectuada con éxito"})   
    }
    catch (e){
        console.log((e));
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