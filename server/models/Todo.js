const node = require('../node')
const helpers = require('../helpers')

const mongoose = node.mongoose
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'), { useNewUrlParser : true });
}


var todoSchema = new Schema({
  
  'name': { 
    type: String,
    required: true
  },
  'description': { type: String },
  'isDone': { type: Boolean, default: false },
  'location': { type: String },
  'userId': { type: Schema.Types.ObjectId, ref: 'User' },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

todoSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

todoSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

todoSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

todoSchema.plugin(node.mongoose_unique_validator)

module.exports = mongoose.model('Todo', todoSchema);
