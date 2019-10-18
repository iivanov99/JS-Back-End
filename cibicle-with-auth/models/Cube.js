const mongoose = require('mongoose');
const { Schema } = mongoose;

const cubeSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'Cube name is required!'],
    minlength: [5, 'Cube name must be atleast 5 characters long.'],
    validate: {
      validator: (v) => {
        return /^[A-Za-z0-9.,'"!\s]+$/.test(v);
      },
      message: (props) => 'Cube name must contain only English letters, digits and whitespaces.'
    },
  },
  description: {
    type: Schema.Types.String,
    required: [true, 'Cube description is required!'],
    minlength: [20, 'Cube description must be atleast 20 characters long.'],
    validate: {
      validator: (v) => {
        return /^[A-Za-z0-9'\s]+$/.test(v);
      },
      message: (props) => 'Cube description must contain only English letters, digits and whitespaces.'
    }
  },
  imageUrl: {
    type: Schema.Types.String,
    required: [ true, 'Image Url is required!'],
    validate: {
      validator: (v) => {
        return v.startsWith('http');
      },
      message: (props) => 'Image url must start with http or https.'
    }
  },
  difficultyLevel: {
    type: Schema.Types.Number,
    required: true,
    minlength: 1,
    maxlength: 6
  },
  accessories: [{
    type: Schema.Types.ObjectId,
    ref: 'Accessory'
  }],
  creatorId: {
    type: Schema.Types.String,
    required: true
  }
});

module.exports = mongoose.model('Cube', cubeSchema);