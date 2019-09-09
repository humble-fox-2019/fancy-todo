const node = require('./node')
const routes = require('./routes')
const middlewares =  require('./middlewares')

//express setup
const express = node.express()
express.use(node.express.json())
express.use(node.express.urlencoded({
    extended :false
}))

//use cors for client request
express.use(node.cors())

//port use env
const port = process.env.PORT

//routes
express.use('/', routes)

//error handler /routes next catcher
express.use(middlewares.errorHandler)

//listening port
express.listen(port, ()=>{
    console.log('listening on port ', port)
})



