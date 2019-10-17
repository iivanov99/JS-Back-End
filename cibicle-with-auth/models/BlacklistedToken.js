const mongoose = require('mongoose');
const { Schema } = mongoose;

const blacklistedTokenSchema = new Schema({
  token: {
    type: Schema.Types.String,
    required: true
  }
});

module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);