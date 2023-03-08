const express =require ('express');
const RadarRouter = express.Router();
const radarController =require ('../controllers/radar.js');
const getAutoCompleteData=require('../Middleware/radarMiddleware.js')
const {formalEmailValidation, validateAuthEmail, validateAuthPassword} =require ('../Middleware/authMiddleware.js');

RadarRouter.get('/autocomplete', radarController.sendAutoComplete);

//module.exports = authRouter;
module.exports = { RadarRouter };