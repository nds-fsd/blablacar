
const express = require('express');
const userRouter = express.Router();
const validateUserInput = require("../Middleware/userMiddleware.js");
const UsrControllers = require('../controllers/user.js');
//de momento suponemos que el schema de users de MongoDB
//se llamará Users
userRouter.get('/users',UsrControllers.usrGetAll);
userRouter.post('/users', validateUserInput, UsrControllers.usrPost);
userRouter.get('/users/:id', UsrControllers.usrGetOne);
userRouter.put('/users/:id', UsrControllers.usrPut);
userRouter.delete('/users/:id', UsrControllers.usrDelete);

module.exports = {userRouter};
  
