const express = require('express');
const { registerUser, loginUser, registerDoctor } = require('../controllers/authController');

const router = express.Router();

// user registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

// doctor registration
router.post('/register-doctor', registerDoctor);

module.exports = router;