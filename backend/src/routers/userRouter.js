
const express = require('express');
const userRouter = express.Router();

const validateUserInput = require("../Middleware/userMiddleware.js");
const UsrControllers = require('../controllers/user.js');
const {body, check} = require('express-validator');
const { jwtTokenVerify, jwtVerifier } = require('../Middleware/jwtMiddleware.js');


//de momento suponemos que el schema de users de MongoDB
//se llamará Users
userRouter.get('/users', jwtTokenVerify, UsrControllers.usrGetAll);
userRouter.post('/users', body('email').normalizeEmail().trim(), check('email').isEmail(), validateUserInput,  UsrControllers.usrPost);
userRouter.get('/users/:id', jwtTokenVerify, UsrControllers.usrGetOne);
userRouter.patch('/users/:id',jwtTokenVerify, UsrControllers.usrPatch);
userRouter.delete('/users/:id', jwtTokenVerify,UsrControllers.usrDelete);
module.exports = {userRouter};
  
