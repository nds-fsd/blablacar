const Users = require ("../mongo/schemas/user.js");
const Bcrypt = require ('bcryptjs');
const Booking  =  require("../mongo/schemas/booking.js");
const Trip  =  require("../mongo/schemas/trip.js");
const dotenv=require('dotenv')
dotenv.config()
const secret = process.env.JWT_SECRET
const expires = process.env.JWT_EXPIRATION_TIME
const expirationTime = Number(process.env.JWT_EXPIRATION_TIME)/3600;
const jwt = require('jsonwebtoken');


const usrGetAll=async (req, res) => {
    const usuarios = await Users.find();
    res.json(usuarios);
    //devolver todos los usuarios que hay en el schema users de MongoDB en formato JSON.
};


//TODO:añadir middlewares, hablar con Paulo
const usrPost= async (req, res) => {
    const body=(req.body);
    let nacimiento=new Date(body.birthday)
    const receivedUser={
        firstName:body.firstName,
        surname:body.surname,
        birthday: nacimiento,
        email:body.email,
        treatment:body.treatment,
        password: body.password
        
    };
    
  try{
    const newUser= new Users(receivedUser);
    await newUser.save()
    const userObj = {
        userID : newUser._id,
        userName: newUser.firstName,
        surname: newUser.surname,
        birthday: newUser.birthday,
        treatment: newUser.treatment,
        picUrl:newUser.picUrl
        
     }
    const hoy = new Date()
    let payload = {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName
      }
    const newJwtToken = jwt.sign(payload, secret ,{
       expiresIn: parseInt(hoy.getTime() / 1000, 10)
     })
    res.status(201).json({success: true, jwtToken: newJwtToken, expirationHours: expirationTime, userObj: userObj});
}catch{
    res.status(400).send({message:"Email already exists"})}
};
  
//TODO:añadir middlewares, hablar con Paulo
 const usrGetOne=async(req, res) => {
    const getUsr=await Users.findById(req.params.id) 
    .populate([{
        path: 'idTrips',
        model: 'Trip',
        populate:([{
            path: 'bookings',
            model: 'Booking',
            populate:  [
                { path: 'passenger', select: '_id'},
    ]}]),
        populate:([{path:'owner', model: 'Users' , select: 'firstName surname email picUrl'},])
        }])
    .populate([{
        path: 'bookedTrips',
        model: 'Booking',
        populate:([{
            path: 'bookedTrip',
            model: 'Trip',
            populate:([{path:'owner', model: 'Users' , select: 'firstName surname email picUrl'},
            {path:'bookings' , model:'Booking',
               populate:({path:'passenger', model:'Users' , select: 'firstName surname email picUrl'})         
        }])}])
        }])
    
        // populate:([{path:'owner', model: 'Users' , select: 'firstName surname email picUrl'},])
        // }])
    res.json(getUsr);
};


//TODO:añadir middlewares, hablar con Paulo
const usrPatch=async(req, res) => {
    console.log(req);
    const updateUsr=await Users.findByIdAndUpdate(req.params.id,req.body)
    const updatedUsr=await Users.findById(req.params.id)
    const expirationTime = Number(process.env.JWT_EXPIRATION_TIME)/3600;
     const userObj = {
        userID : updatedUsr._id,
        userName: updatedUsr.firstName,
        surname: updatedUsr.surname,
        birthday: updatedUsr.birthday,
        treatment: updatedUsr.treatment,
        picUrl:updatedUsr.picUrl
     }
        res.status(200).json({success: true, jwtToken: req.token, expirationHours: expirationTime, userObj: userObj});
};

  
//TODO:añadir middlewares, hablar con Paulo
const usrDelete=async(req, res) => {
    const delUsr=await Users.findByIdAndDelete(req.params.id)
    //TODO: comprobar si devolvemos algo con el borrado
    //o mejor crear campo "inactive" para borrar temporalmente
    res.json(delUsr)    
};
module.exports={usrDelete,usrGetAll,usrGetOne,usrPost,usrPatch}
