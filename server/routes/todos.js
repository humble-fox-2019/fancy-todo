const Router = require('express').Router();
const Authenthication = require('../middleware/Authenthication')
const AuthorizationTodo = require('../middleware/Authorization-Todo')
const todo = require('../controllers/todo')

Router.use(Authenthication)
Router.get('/:todoId', AuthorizationTodo, todo.findOne)
Router.get('/filter', todo.filter)
Router.get('/', todo.read)
Router.post('/user', todo.createForUser)

Router.delete('/:todoId', AuthorizationTodo, todo.delete)
Router.put('/:todoId', AuthorizationTodo, todo.update)

module.exports = Router;