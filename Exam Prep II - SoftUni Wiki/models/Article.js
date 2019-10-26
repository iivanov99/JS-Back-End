const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: [true, 'Article title is required!'],
    unique: true,
    minlength: [5, 'Article title must be atleast 5 symbols long!']
  },
  description: {
    type: Schema.Types.String,
    required: [true, 'Article description is required!'],
    minlength: [20, 'Article description must be atleast 20 symbols long!']
  },
  articleAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  creationDate: {
    type: Schema.Types.Date,
    default: new Date().toLocaleString()
  }
});

module.exports = mongoose.model('Article', articleSchema);