if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT; 
const routes = require('./routes');

app.use(express.json())
// mongoose.connect('mongodb://localhost:27017/fancy-todo', {useNewUrlParser: true},()=>{
//     console.log('mongodb is connected');
// });
mongoose.connect(`mongodb://${process.env.USERNAME123}:${process.env.PASSWORD}@cluster0-shard-00-00-houoa.mongodb.net:27017,cluster0-shard-00-01-houoa.mongodb.net:27017,cluster0-shard-00-02-houoa.mongodb.net:27017/fancy-todo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, {useNewUrlParser: true},()=>{
})
.then(data=>{
    console.log(process.env.USERNAME123 , process.env.PASSWORD)
    console.log('mongodb is connected');
})
.catch(err=>{
    console.log(err)
})

app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))

app.use(cors()) 
app.get('/',(req,res,next)=>{
    res.send('HOME OF API')
})

app.use('/' , routes)

// app.use('/user' , AuthRouter)
// app.use('/todo' ,  TodoRouter)

app.use(function (err, req, res, next) {
    console.log(err)
    if(err.name == 'ValidationError'){
        res.status(400).json({
            message : err
        })
    }else {
        res.status(500).send({message:'Internal Server Error'})
    }
})

app.listen(port,()=>{
    console.log('listening to port ',port);
})
