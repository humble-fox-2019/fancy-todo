require('dotenv').config()
const morgan = require('morgan')

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/fancytodo', {
    useNewUrlParser: true
});
// mongoose.connect(process.env.MONGOATLAS, {
//     useNewUrlParser: true
// });

app.use(morgan())
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const userRoutes = require('./routes/signRoutes')
const todoRoutes = require('./routes/todoRoutes')

app.use('/user', userRoutes)
app.use('/todo', todoRoutes)

const errHandler = require('./middleware/errHandler')


app.use(errHandler)
app.listen(port, () => console.log(`Example app listening on port port!`))