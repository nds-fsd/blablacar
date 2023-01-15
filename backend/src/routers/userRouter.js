
import express from 'express';
const userRouter = express.Router();
import validateUserInput from "../Middleware/userMiddleware.js";
import UsrControllers from '../controllers/user.js';
//de momento suponemos que el schema de users de MongoDB
//se llamará Users
userRouter.get('/users',UsrControllers.usrGetAll);
userRouter.post('/users', validateUserInput, UsrControllers.usrPost);
userRouter.get('/users/:id', UsrControllers.usrGetOne);
userRouter.put('/users/:id', UsrControllers.usrPut);
userRouter.delete('/users/:id', UsrControllers.usrDelete);

export {userRouter};
  
