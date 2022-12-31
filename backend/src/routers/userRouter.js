
import express from 'express';
const userRouter = express.Router();
import Users from '../mongo/schemas/user.js';
import validateUserInput from "../Middleware/userMiddleware.js";

//de momento suponemos que el schema de users de MongoDB
//se llamará Users

userRouter.get('/users',async (req, res) => {
    const usuarios = await Users.find();
    res.json(usuarios);
    //devolver todos los usuarios que hay en el schema users de MongoDB en formato JSON.
});


//TODO:añadir middlewares, hablar con Paulo
userRouter.post('/users', validateUserInput, async (req, res) => {
    const body=(req.body);

    //TODO:comprobar con antonio campos de user y con Alex para formulario creacion
    const receivedUser={
        name:body.name,
        surname:body.surname,
        dateOfBirth: body.dateOfBirth,
        email:body.email,
        treatment:body.treatment,
        password:body.password
        //hola
    };
  
    const newUser= new Users(receivedUser);
    await newUser.save()
  
    res.status(201).json("El usuario "+newUser.name + " ha sido creada correctamente");
});
  
//TODO:añadir middlewares, hablar con Paulo
    userRouter.get('/users/:id', async(req, res) => {
    const getUsr=await Users.findById(req.params.id)
    res.json(getUsr);
})  

//TODO:añadir middlewares, hablar con Paulo
userRouter.put('/users/:id', async(req, res) => {
    const updateUsr=await Users.findByIdAndUpdate(req.params.id,req.body)
    const updatedUsr=await Users.findById(req.params.id)
    res.json(updatedUsr);
});
  
//TODO:añadir middlewares, hablar con Paulo
userRouter.delete('/users/:id', async(req, res) => {
    const delTask=await Users.findByIdAndDelete(req.params.id)
    //TODO: comprobar si devolvemos algo con el borrado
    //o mejor crear campo "inactive" para borrar temporalmente
    res.json(delTask)    
});

export {userRouter};
  
