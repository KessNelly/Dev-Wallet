const express = require('express');
const { register,login, dashboard } = require('../controllers/customerControls.js');
const { verifyAuth } = require('../middleware/auth.js');
const routeManager = express.Router()
// routeManager.get('/',register)
routeManager.post('/registerCustomer',register)
routeManager.post('/Auth',login)
routeManager.post('/dashboard',verifyAuth,dashboard)
module.exports = {routeManager}