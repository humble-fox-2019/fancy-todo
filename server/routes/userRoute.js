const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Auth
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;