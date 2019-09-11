require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes')
const errHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', index)

let localMongo = 'mongodb://localhost/fancy-TODO'
let mongoAtlas = 'mongodb+srv://ayusudi:ayusudi@cluster0-acddn.mongodb.net/fancy-todo?retryWrites=true&w=majority'

mongoose.connect(mongoAtlas, {
  useNewUrlParser : true
}, function(err){
  if(err) console.log(`server isn't connect to mongodb`);
  else console.log('Connected!');
})

// mongoose.connect('mongodb://ayusudi:ayu123@ds261277.mlab.com:61277/todo-fancy-ayu', { useNewUrlParser: true })
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log(`Connected to todo db`);
// });

app.use(errHandler)

app.listen(PORT, function(){
  console.log(`Hello from port ${PORT}`);
})