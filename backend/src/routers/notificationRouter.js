const express = require('express');
const notificationRouter = express.Router();
const notificationControllers = require('../controllers/notification.js');

notificationRouter.get('/notification/:id', notificationControllers.getAllNotifications);

module.exports = {notificationRouter};