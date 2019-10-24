const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: [true, 'Course title is required!'],
    minlength: [4, 'Course title must be atleast 4 characters long!'],
    unique: true,
  },
  description: {
    type: Schema.Types.String,
    required: [true, 'Course description is required!'],
    minlength: [20, 'Course description must be atleast 20 characters long!'],
    maxlength: [50, 'Course description must not exceed 50 characters!']
  },
  imageUrl: {
    type: Schema.Types.String,
    required: [true, 'Image Url is required!'],
    validate: {
      validator: (v) => {
        return v.startsWith('https');
      },
      message: () => 'Image Url must start with http or https!'
    }
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Schema.Types.Date,
    required: [true, 'Created at is requried!'],
  },
  usersEnrolled: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  creatorId: {
    type: Schema.Types.String,
    required: [true, "Creator id is required!"]
  }
});

module.exports = mongoose.model('Course', courseSchema);