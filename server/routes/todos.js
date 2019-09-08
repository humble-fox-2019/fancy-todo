const Router = require('express').Router();
const Authenthication = require('../middleware/Authenthication')
const todo = require('../controllers/todo')

Router.use(Authenthication)
Router.get('/', todo.read)
Router.post('/user', todo.createForUser)

module.exports = Router;