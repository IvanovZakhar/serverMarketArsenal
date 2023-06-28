const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  access: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: false,
    unique: true
  },
  lname: {
    type: String,
    required: false,
    unique: true
  },
  lfname: {
    type: String,
    required: false,
    unique: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmationCode: {
    type: String
  },
  isNumberVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
