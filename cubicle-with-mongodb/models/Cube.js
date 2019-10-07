const mongoose = require('mongoose');
const { Schema } = mongoose;

const cubeSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  description: {
    type: Schema.Types.String,
    required: true,
    maxlength: 300
  },
  imageUrl: {
    type: Schema.Types.String,
    required: true
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
  }]
});

cubeSchema.path('imageUrl').validate(function () {
  return this.imageUrl.startsWith('http') ||
    (this.imageUrl.endsWith('.jpg') || this.imageUrl.endsWith('.png'));
}, 'Image URL must start with http or end with .jpg or .png');

module.exports = mongoose.model('Cube', cubeSchema);