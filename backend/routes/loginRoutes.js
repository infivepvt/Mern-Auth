// loginRoutes.js
const express = require('express');
const router = express.Router();
const { signup, signin, getUserByEmail } = require('../controllers/loginController');

// Define the routes with proper callback functions
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/user/:email', getUserByEmail);

module.exports = router;
