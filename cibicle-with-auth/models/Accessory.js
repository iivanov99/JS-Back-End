const mongoose = require('mongoose');
const { Schema } = mongoose;

const accessorySchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'Accessory name is required!'],
    minlength: [5, 'Accessory name must be atleast 5 characters long.'],
    validate: {
      validator: (v) => {
        return /^[A-Za-z0-9.,'"!\s]+$/.test(v);
      },
      message: (props) => 'Accessory name must contain only English letters, digits and whitespaces.'
    },
  },
  description: {
    type: Schema.Types.String,
    required: [true, 'Accessory description is required!'],
    minlength: [20, 'Accessory description must be atleast 20 characters long.'],
    validate: {
      validator: (v) => {
        return /^[A-Za-z0-9'\s]+$/.test(v);
      },
      message: (props) => 'Accessory description must contain only English letters, digits and whitespaces.'
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
  cubes: [{
    type: Schema.Types.ObjectId,
    ref: 'Cube'
  }]
});

module.exports = mongoose.model('Accessory', accessorySchema);