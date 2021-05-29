const express = require('express');
const router = express.Router();

//Load Controllers
const { getAllSubdomainsController, addData, createPDF, fetchPDF } = require('../controllers/subdomain.controller.js');

const {checkUserAccess} = require('../middleware/authentication');

router.get('/getSudomains?:q', getAllSubdomainsController);

router.post('/create-pdf',checkUserAccess, createPDF);

router.get('/fetch-pdf',checkUserAccess, fetchPDF);

router.post('/addData', addData);

module.exports = router;