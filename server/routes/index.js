const node = require('../node')
const user = require('./user')
const todo = require('./todo')
const Router = node.express.Router()

Router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'status app : running'
    })
})

Router.use('/user', user)
Router.use('/todo', todo)

module.exports = Router