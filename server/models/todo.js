const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: Boolean,
    default: false
  },
  due_date: {
    type: Date,
    default: ''
    // required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

todoSchema.pre('save', function() {
  if (this.due_date < Date.now()) {
    this.due_date = Date.now()
  }
})

module.exports = mongoose.model('Todo', todoSchema)