'use strict'

const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/fancy-todo', { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
      console.log('Connected to MongoDB database')
    }).catch((err) => {
      console.error(err, 'Could not connected to MongoDB database')
    })
}
