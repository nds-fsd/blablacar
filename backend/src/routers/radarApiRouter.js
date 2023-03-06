const express = require ('express');
const RadarApiRouter = express.Router();
const RadarApi= require ("../controllers/radarApi.js");
const getAutoComplete = require('../Middleware/getAutocomplete.js')

RadarApiRouter.post("/RadarApi/Autocomplete", getAutoComplete, RadarApi.sendAutoComplete)

module.exports = {RadarApiRouter};
