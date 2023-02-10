const express =require ('express');
const authRouter = express.Router();
const {body, check} =require ('express-validator');
const grantUserAuth =require ('../controllers/auth.js');
const {formalEmailValidation, validateAuthEmail, validateAuthPassword} =require ('../Middleware/authMiddleware.js');
const {jwtTokenSign, jwtTokenSingTest} =require ('../Middleware/jwtMiddleware.js');
authRouter.post('/login', body('email').normalizeEmail().trim(), check('email').isEmail(), formalEmailValidation, validateAuthEmail, validateAuthPassword, jwtTokenSingTest, grantUserAuth.authUser);

//module.exports = authRouter;
module.exports = { authRouter };