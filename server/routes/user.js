const router = require('express').Router();
const UserController = require('../controllers/user');

router.get('/', UserController.findAll);

module.exports = router;