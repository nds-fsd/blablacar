
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
userRouter.post('/users/:idUser/booking/:idTrip', UsrControllers.bookTrip);
userRouter.get('/booking', UsrControllers.bookGetAll);
userRouter.put('/users/:id', body('email').normalizeEmail().trim(), check('email').isEmail(), UsrControllers.usrPut);
userRouter.delete('/users/:id', UsrControllers.usrDelete);

module.exports = {userRouter};
  
