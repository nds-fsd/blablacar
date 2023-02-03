const Users = require ("../mongo/schemas/user.js");
const Bcrypt = require ('bcryptjs');
const Booking  =  require("../mongo/schemas/booking.js");
const Trip  =  require("../mongo/schemas/trip.js");


const usrGetAll=async (req, res) => {
    const usuarios = await Users.find();
    console.log(usuarios);
    res.json(usuarios);
    //devolver todos los usuarios que hay en el schema users de MongoDB en formato JSON.
};


//TODO:añadir middlewares, hablar con Paulo
const usrPost= async (req, res) => {
    const body=(req.body);
    console.log(body)

    //TODO:comprobar con antonio campos de user y con Alex para formulario creacion
    const receivedUser={
        name:body.name,
        surname:body.surname,
        Birthday: body.Birthday.toString(),
        email:body.email,
        treatment:body.treatment,
        password: body.password
        //hola
    };
  try{
    console.log(receivedUser)
    const newUser= new Users(receivedUser);
    await newUser.save()
  
    res.status(201).json(newUser);
}catch{
    res.status(400).send({message:"Email already exists"})}
};
  
//TODO:añadir middlewares, hablar con Paulo
 const usrGetOne=async(req, res) => {
    const getUsr=await Users.findById(req.params.id) .populate("idTrips")
    .populate([{
        path: 'bookedTrips',
        model: 'Booking',
        populate:  [
            { path: 'passenger', select: 'name surname email'},
            { path: 'bookedTrip'},
          ],
    }])
    res.json(getUsr);
};

//TODO:añadir middlewares, hablar con Paulo
const usrPut=async(req, res) => {
    const updateUsr=await Users.findByIdAndUpdate(req.params.id,req.body)
    const updatedUsr=await Users.findById(req.params.id)
    res.json(updatedUsr);
};
  
//TODO:añadir middlewares, hablar con Paulo
const usrDelete=async(req, res) => {
    const delUsr=await Users.findByIdAndDelete(req.params.id)
    //TODO: comprobar si devolvemos algo con el borrado
    //o mejor crear campo "inactive" para borrar temporalmente
    res.json(delUsr)    
};

const bookTrip = async(req,res) =>{
    const {idUser,idTrip} = req.params
    // return res.status(201).json({message: `${idUser},${idTrip}`});
    try{
        if(!idUser) return res.status(400).json({message: "No hay usuario establecido"});
        console.log("idUser",idUser)
        if(!idTrip) return res.status(400).json({message: "No hay viaje establecido"});
        console.log("idTrip",idTrip)
        const user = await Users.findById(idUser);
        const trip = await Trip.findById(idTrip);
            const book = new Booking({
                passenger: idUser,
                bookedTrip: idTrip,
            });
            user.bookedTrips.push(book)
            await book.save()
            await user.save()
            return res.status(200).json(user)
        
    }
    catch (e){
        res.status(500).json({ message: e })
    }

}
const bookGetAll=async (req, res) => {
    const book = await Booking.find();
    console.log(book);
    res.json(book);
    //devolver todos los usuarios que hay en el schema users de MongoDB en formato JSON.
};


module.exports={usrDelete,usrGetAll,usrGetOne,usrPost,usrPut, bookTrip,bookGetAll}