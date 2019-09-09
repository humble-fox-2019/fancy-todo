if(process.env.NODE_ENV === "development"){
    require('dotenv').config()
}

const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const router = require('./routes/index')
const mongooseConnect = require('./config/mongoose')
const PORT = process.env.PORT || 3000
const app = express()

mongooseConnect()

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(cors())
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})