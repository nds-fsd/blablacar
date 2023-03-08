const express = require('express');
const notificationRouter = express.Router();
const notificationControllers = require('../controllers/notification.js');

notificationRouter.get('/notification/:id', notificationControllers.getAllNotifications);
notificationRouter.patch('/notification/:id', notificationControllers.patchNotifications)
notificationRouter.delete('/notification/:id', notificationControllers.delNotifications)
module.exports = {notificationRouter};