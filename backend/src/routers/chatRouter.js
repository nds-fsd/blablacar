const express = require ('express');
const chatRouter = express.Router();
const chatControllers = require ("../controllers/chat.js");
const { jwtTokenVerify } = require('../Middleware/jwtMiddleware.js');
chatRouter.get("/chat",jwtTokenVerify,chatControllers.GetAllChats)
chatRouter.post("/chat",jwtTokenVerify, chatControllers.createChat)
chatRouter.get("/chat/:id",jwtTokenVerify,chatControllers.getOne)
chatRouter.delete("/chat/:id",jwtTokenVerify,chatControllers.deleteOne)

module.exports = {chatRouter};