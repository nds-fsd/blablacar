
const express = require('express');
const userRouter = express.Router();

const validateUserInput = require("../Middleware/userMiddleware.js");
const UsrControllers = require('../controllers/user.js');
const {body, check} = require('express-validator');
const {jwtTokenVerify} = require("../Middleware/jwtMiddleware.js")

//de momento suponemos que el schema de users de MongoDB
//se llamará Users
userRouter.get('/users', UsrControllers.usrGetAll);
userRouter.post('/users', body('email').normalizeEmail().trim(), check('email').isEmail(), validateUserInput, UsrControllers.usrPost);
userRouter.get('/users/:id', UsrControllers.usrGetOne);
userRouter.post('/users/:id', UsrControllers.usrPost);
userRouter.patch('/users/:id', UsrControllers.usrPatch);
userRouter.delete('/users/:id', UsrControllers.usrDelete);
module.exports = {userRouter};
  
