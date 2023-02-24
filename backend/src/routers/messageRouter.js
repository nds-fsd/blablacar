const express = require ('express');
const messageRouter = express.Router();
const messageControllers = require ("../controllers/message.js");
const { jwtTokenVerify } = require('../Middleware/jwtMiddleware.js');

messageRouter.post("/message",jwtTokenVerify, messageControllers.createMessage)

module.exports = {messageRouter};
