const Router = require('express').Router();
const { project } = require('../controllers');

Router.get('/', project.read)
Router.post('/', project.create)
Router.put('/:projectId', project.update)
Router.delete('/:projectId', project.delete)
Router.post('/todo', project.addTodo)

module.exports = Router;