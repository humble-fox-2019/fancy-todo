const node = require('../node')
const controllers = require('../controllers')
const middlewares = require('../middlewares')

const Router = node.express.Router()

Router.use( middlewares.authentication )
Router.route('/')
    .get(controllers.Todo.getAll)
    .post(controllers.Todo.postOne)

Router.route('/:id')
    .get(middlewares.authorization, controllers.Todo.getOne)
    .patch(middlewares.authorization, controllers.Todo.patchOne)
    .delete(middlewares.authorization, controllers.Todo.deleteOne)

Router.patch('/:id/done', middlewares.authorization, controllers.Todo.patchDone)

module.exports = Router