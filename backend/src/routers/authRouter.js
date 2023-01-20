import express from 'express';
const authRouter = express.Router();
import {body, check} from 'express-validator';
import grantUserAuth from '../controllers/auth.js';
import {formalEmailValidation, validateAuthEmail, validateAuthPassword} from '../Middleware/authMiddleware.js';
import {jwtTokenSign} from '../Middleware/jwtMiddleware.js'
authRouter.post('/login', body('email').normalizeEmail().trim(), check('email').isEmail(), formalEmailValidation, validateAuthEmail, validateAuthPassword, jwtTokenSign, grantUserAuth.authUser);

//module.exports = authRouter;
export { authRouter };