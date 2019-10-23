const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: [true, 'Username is required!'],
    unique: true,
    minlength: [5, 'Username must be atleast 5 characters long!'],
    validate: {
      validator: (v) => {
        return /^[A-Za-z0-9]+$/.test(v);
      },
      message: () => 'Username must contain only english letters and digits!'
    }
  },
  password: {
    type: Schema.Types.String,
    required: [true, 'Password is required!'],
    minlength: [8, 'Password must be atleast 8 characters long!'],
    validate: {
      validator: (v) => {
        return /^[A-Za-z0-9]+$/.test(v);
      },
      message: () => 'Password must contain only english letters and digits!'
    }
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