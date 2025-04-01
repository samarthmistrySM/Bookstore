"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _swaggerAutogen = _interopRequireDefault(require("swagger-autogen"));
var doc = {
  info: {
    title: 'Bookstore API',
    description: 'Description'
  },
  host: 'localhost:3000'
};
var outputFile = './swagger-output.json';
var routes = ['./routes/index.js'];
(0, _swaggerAutogen["default"])()(outputFile, routes, doc);