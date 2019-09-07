const Router = require('express').Router();
const { user } = require('../controllers');

// * Create New User {username, email, password}
Router.post('/', user.create)

module.exports = Router;