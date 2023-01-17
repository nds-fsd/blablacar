import Users from "../mongo/schemas/user.js";
import Bcrypt from 'bcryptjs';

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
        password: Bcrypt.hashSync(body.password, 10)
        //hola
    };
  try{
    console.log(receivedUser)
    const newUser= new Users(receivedUser);
    await newUser.save()
  
    res.status(201).json("El usuario "+newUser.name + " ha sido creada correctamente");
}catch{res.status(400).send({message:"Email already exists"})}
};
  
//TODO:añadir middlewares, hablar con Paulo
 const usrGetOne=async(req, res) => {
    const getUsr=await Users.findById(req.params.id)
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

export default{usrDelete,usrGetAll,usrGetOne,usrPost,usrPut}