const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
let mongoose = require('mongoose');
let routeIndex = require('./routes');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use('/',routeIndex);

mongoose.connect('mongodb://localhost:27017/to-dosDB',{useNewUrlParser:true}).then(()=>{
    console.log("connection OK")
}).catch((err)=>{
    console.log(err)
});



app.listen(port, function(){
    console.log(`app listening on port ${port}`)
})