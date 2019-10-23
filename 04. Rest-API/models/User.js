const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: [true, 'Email is required!'],
    unique: true
  },
  firstName: {
    type: Schema.Types.String,
    required: [true, 'First name is required!'],
  },
  lastName: {
    type: Schema.Types.String,
    required: [true, 'Last name is required!'],
  },
  password: {
    type: Schema.Types.String,
    required: [true, 'Password is required!'],
  },
  isAdmin: {
    type: Schema.Types.Boolean,
    default: false
  }
});

userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  }
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    } catch (err) {
      next(err);
      return;
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);