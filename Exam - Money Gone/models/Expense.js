const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  merchant: {
    type: Schema.Types.String,
    required: [true, 'Merchant is required!'],
    minlength: [4, 'Merchant must be alteast 4 characters long!']
  },
  total: {
    type: Schema.Types.Number,
    required: [true, 'Total is required!'],
    validate: {
      validator: (v) => {
        return v >= 0;
      },
      message: () => 'Total must be a positive number!'
    }
  },
  category: {
    type: Schema.Types.String,
    required: [true, 'Category is required!']
  },
  description: {
    type: Schema.Types.String,
    required: [true, 'Description is required!'],
    minlength: [10, 'Decsription must be atleast 10 characters!'],
    maxlength: [50, 'Description must not exceed 50 characters!']
  },
  date: {
    type: Schema.Types.Date,
    required: true,
    default: new Date().toLocaleString()
  },
  report: {
    type: Schema.Types.Boolean,
    required: true,
    default: false
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Expense', expenseSchema);