const Booking  =  require("../mongo/schemas/booking.js");
const Trip  =  require("../mongo/schemas/trip.js");
const Users = require ("../mongo/schemas/user.js");
const Notification = require ("../mongo/schemas/notification.js")
const dateWorks = require ('../utils/dateWorks.js')

const getTripBooking=async(req,res)=>{
    console.log(req.params);
    if(!req.params.id){
        res.status(400).json({"message":"No ID!"})
    }
    const bookings=await Booking.find({bookedTrip:req.params.id})
    res.status(200).json(bookings)
}

const bookGetAll=async (req, res) => {
    const book = await Booking.find();
    console.log(book);
    res.status(200).json(book);
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
            res.status(201).json({message:"Reserva efectuada con éxito","id":book._id})   
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
            select: 'firstname surname email _id',
        }])

        res.status(200).json(book)

    }catch(error){
        res.status(500).json({message: error})
    }
}
const deleteBooking =  async (req,res) =>{    
    try{
        console.log(req.params.id);
        const id=req.params.id
        const booking=await Booking.findById(id)
        console.log(booking);
        if(!booking) return res.status(400).json({message: "Número de reserva incorrecto"});
        const bookUser = await Users.findById(booking.passenger);
        const bookTrip = await Trip.findById(booking.bookedTrip);
        console.log(bookTrip.bookings);
        const delBook = await Booking.findByIdAndDelete(booking)

            let originDate=new Date(bookTrip.originDate);
            let diaSalida= dateWorks.diaSemana(originDate);
            let mesSalida= dateWorks.mesFecha(originDate)
            console.log(bookTrip.owner);
            const notification = new Notification({
                destinatary: bookTrip.owner,
                sender: bookUser._id,
                title: "Reserva Cancelada",
                body: `El usuario ${bookUser.firstName} ha cancelado la reserva de tu viaje a ${bookTrip.destination} con fecha el ${diaSalida}, ${originDate.getDate()} de ${mesSalida} `
    
            });
            console.log(bookTrip.owner);
            const index=bookUser.bookedTrips.indexOf(id)
            console.log(index);
            bookTrip.bookings.slice(index,1)
            bookTrip.availableSeats = bookTrip.availableSeats + 1
            
            
            await bookTrip.save()
            await notification.save()

            res.status(201).json({message:"Reserva eliminada con éxito","id":booking._id})   
    }
    catch (e){
        console.log((e));
        res.status(500).json({ message: e })
    }

}

module.exports={bookTrip,bookGetAll,getSpecificBooking,deleteBooking,getTripBooking}