const Router = require('express').Router();
const { user } = require('../controllers');

// * Create New User {username, email, password}
Router.post('/login', user.login)
Router.post('/register', user.create)

module.exports = Router;