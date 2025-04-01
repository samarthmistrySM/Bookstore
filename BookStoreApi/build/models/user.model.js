"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var userSchema = new _mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    "default": 1234567890
  },
  password: {
    type: String,
    required: true
  },
  cart: [{
    book: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  wishList: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
});
var _default = exports["default"] = (0, _mongoose.model)('User', userSchema);