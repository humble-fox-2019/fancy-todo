if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', router)
app.use(errorHandler)

mongoose.connect('mongodb://localhost:27017/fancy-todo', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to db')
    })
    .catch(() => {
        console.log('Failed to connect db')
    })

app.listen(port, function () {
    console.log('Listen to : ' + port)
})