const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'please provide your password'],
    minlength: 8,
    select: false,
  },
  phone: {
    type: Number,
    required: [true, 'please provide your phone number'],
  },
  address: {
    type: String,
    required: [true, 'please provide your address'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please provide your password confirm'],
    validate: {
      //this only work on CREATE and SAVE
      validator: function (str) {
        return str === this.password;
      },
      message: 'please insert the same password',
    },
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
    },
    default: 'user',
  },
});

// ma hoa password khi sign up de luu vao database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
