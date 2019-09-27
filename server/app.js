if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const router = require('./routes')

const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.ATLAS_CONNECT, { useNewUrlParser: true, useFindAndModify: false })
  .then(_ => {
    console.log('MongoDB: connected')
  })
  .catch(_ => {
    console.log('MongoDB: failed to connect')
  })

app.use(cors())
app.use('/', router)
app.use(errorHandler)


app.listen(PORT, () => console.log(`listening on ${PORT}`))