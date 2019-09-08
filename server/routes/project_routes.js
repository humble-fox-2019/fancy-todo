const express = require('express');
const router = express.Router();

const { project_controller ,  todo_project_controller } = require('../controllers')

const { Authenthication , AuthorizedProject } =  require('../middelware');

router.use(Authenthication)

router.get('/'  , project_controller.getAll )
router.get('/AllUser' ,  project_controller.getUser)
router.post('/' ,  project_controller.createProject)
router.get('/invite' , project_controller.getInvitaion)
router.patch('/confirm/:id' ,  project_controller.confirmProject)
router.get('/:id' ,  AuthorizedProject , project_controller.findOneProject)
router.patch('/:id/todo' , AuthorizedProject  , project_controller.addTodo)
router.delete('/:id/todo/:todoId' , AuthorizedProject  ,  todo_project_controller.deleteTodo)
router.patch('/:id/todo/:todoId/complete' , AuthorizedProject  ,  todo_project_controller.completeTodo)
router.patch('/:id/todo/:todoId/uncomplete' , AuthorizedProject  ,  todo_project_controller.uncompleteTodo)
router.get('/:id/getUser' , AuthorizedProject ,  todo_project_controller.addNewMember)


module.exports = router
