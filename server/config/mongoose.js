const mongoose = require('mongoose')
module.exports = ()=>{
    mongoose.connect('mongodb://localhost:27017/FancyTodo', { useNewUrlParser : true})
        .then( success => {
            console.log(`mongoose connected`)
        })
        .catch( err => {
            console.log(`Mongoose conncted failed`)
            console.log(err)
        })
} 
