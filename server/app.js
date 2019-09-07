const express = require('express')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const router = require('./routes/index')
const PORT = process.env.PORT || 3000
const mongooseConnect = require('./config/mongoose')

mongooseConnect()

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(cors())
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})