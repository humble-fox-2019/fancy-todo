const node = require('../node')
const controllers = require('../controllers')

const Router = node.express.Router()

Router.post('/register', controllers.User.register)
Router.post('/login', controllers.User.login)
Router.post('/googleSignIn', controllers.User.googleSignIn)

module.exports = Router