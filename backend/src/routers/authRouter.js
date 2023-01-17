import express from 'express';
const authRouter = express.Router();
import {body, check} from 'express-validator';
//import LoginControllers from '../controllers/auth';
import {formalEmailValidation, validateAuthEmail, validateAuthPassword} from '../Middleware/authMiddleware.js';

authRouter.post('/login', body('email').normalizeEmail().trim(), check('email').isEmail(), formalEmailValidation, validateAuthEmail, validateAuthPassword);

//module.exports = authRouter;
export { authRouter };