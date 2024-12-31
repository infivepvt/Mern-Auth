// adminRoutes.js
const express = require('express');
const router = express.Router();
const { saveAdminDetails } = require('../controllers/adminController');
const { urlChecker } = require('../controllers/adminController');




router.post('/save',  saveAdminDetails);
router.post('/urlChecker', urlChecker);

module.exports = router;