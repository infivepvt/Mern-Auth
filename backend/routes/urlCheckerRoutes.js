// routes/urlCheckerRoutes.js
const express = require('express');
const router = express.Router();
const { urlChecker } = require('../controllers/urlCheckerController');

// Define the URLChecker route
router.post('/urlChecker', urlChecker);


module.exports = router;