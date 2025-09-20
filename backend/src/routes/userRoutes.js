const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Signup
router.post('/signup', userController.signup);

// Login
router.post('/login', userController.login);

// Get all users (optional)
router.get('/', userController.getAllUsers);

module.exports = router;
