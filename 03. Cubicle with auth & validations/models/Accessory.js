const mongoose = require('mongoose');
const { Schema } = mongoose;

const accessorySchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'Accessory name is required!'],
    minlength: [5, 'Accessory name must be atleast 5 characters!'],
    validate: {
      validator: (v) => {
        return /^[A-Za-z0-9.,'"!?\s]+$/.test(v);
      },
      message: () => 'Accessory name must contain only English letters, digits and whitespaces.'
    },
  },
  description: {
    type: Schema.Types.String,
    required: [true, 'Accessory description is required!'],
    maxlength: [200, 'Accessory description must not exceed 200 characters!'],
    minlength: [20, 'Accessory description must be atleast 20 characters!'],
    validate: {
      validator: (v) => {
        return /^[A-Za-z0-9.,'"!?\s]+$/.test(v);
      },
      message: () => 'Accessory description must contain only English letters, digits and whitespaces.'
    },
  },
  imageUrl: {
    type: Schema.Types.String,
    required: [true, 'Image Url is required!'],
    validate: {
      validator: (v) => {
        return v.startsWith('http');
      },
      message: () => 'Image Url must start with http or https!'
    }
  },
  cubes: [{
    type: Schema.Types.ObjectId,
    ref: 'Cube'
  }]
});

module.exports = mongoose.model('Accessory', accessorySchema);