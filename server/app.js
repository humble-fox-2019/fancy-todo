if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/FancyTodo', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
.then(()=>{
    console.log('connected to MongoDB')
})
.catch(err =>{
    console.log('failed to connect to MongoDB', err)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const router = require('./routes')
const PORT = process.env.PORT || 3000

const errorHandler = require('./middlewares/errorHandler')

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, function(){
    console.log('connected to port', PORT)
})