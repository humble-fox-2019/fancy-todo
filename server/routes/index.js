const express = require('express');
const router = express.Router();
const AuthRouter = require('./auth_routes')
const TodoRouter = require('./todo_routes')
const project_routes = require('./project_routes')

router.use('/user'  , AuthRouter )
router.use('/todo' ,  TodoRouter)
router.use('/project' , project_routes)

module.exports = router
