'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ObjectId = mongoose.Schema.Types.ObjectId

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please insert a title for todo!']
  },
  description: String,
  status: { type: Boolean, default: false },
  dueDate: Date,
  urgency: { type: Boolean, default: false },
  UserId: { type: ObjectId, ref: 'User' }
}, {
  timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
