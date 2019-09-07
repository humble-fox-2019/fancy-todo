if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const { errorHandler } = require('./middleware')
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/fancy-todo", { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB: fancy-todo'))
    .catch((err) => console.log(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', routes)


app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))