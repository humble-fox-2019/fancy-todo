if ( process.env.NODE_ENV ) 
    require('dotenv').config()
    
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const userRouter = require('./routes/user')
const todoRouter = require('./routes/todo')
const errorHandler = require('./middleware/errorHandler')

const DATABASE_URL = 'mongodb://localhost:27017/FancyTodo_DATABASE'
mongoose.connect( DATABASE_URL , { useNewUrlParser: true })
    .then( () => { console.log( `Connected to ${DATABASE_URL}`) })
    .catch ( err => { console.log( err ) })

mongoose.set('useCreateIndex', true)


const app = express();

app.use( cors() )
app.use( express.json() );
app.use( express.urlencoded({ extended: false }));


app.use ( '/' , userRouter )
app.use ( '/todos' , todoRouter )



app.use( errorHandler )


const PORT = process.env.PORT || 3000;

app.listen( PORT , () => {
    console.log (`App listening on PORT ${PORT}`)
})