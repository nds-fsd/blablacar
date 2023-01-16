import express from 'express';
const loginRouter = express.Router();
const { body, validationResult } = require('express-validator');
import LoginControllers from '../controllers/login';

loginRouter.post('/',  check('email').isEmail(), validateAuthEmail, validateAuthPassword);

