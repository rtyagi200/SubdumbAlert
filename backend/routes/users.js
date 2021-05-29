const express = require('express');
const router = express.Router();

//Load Controllers
const { registerController, loginController } = require('../controllers/auth.controller.js');

router.post('/register', registerController);

router.post('/login', loginController);

module.exports = router;