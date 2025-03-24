"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = exports.getUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user["default"].findById(id);
        case 2:
          data = _context.sent;
          return _context.abrupt("return", data);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
var login = exports.login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data, isMatch, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _user["default"].findOne({
            email: body.email
          });
        case 2:
          data = _context2.sent;
          if (data) {
            _context2.next = 5;
            break;
          }
          throw new Error("User with email ".concat(body.email, " does not exist"));
        case 5:
          _context2.next = 7;
          return _bcrypt["default"].compare(body.password, data.password);
        case 7:
          isMatch = _context2.sent;
          if (isMatch) {
            _context2.next = 10;
            break;
          }
          throw new Error("Password incorrect");
        case 10:
          _context2.next = 12;
          return _jsonwebtoken["default"].sign({
            userId: data._id
          }, process.env.JWT_SECRET);
        case 12:
          token = _context2.sent;
          return _context2.abrupt("return", token);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var register = exports.register = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var userExist, salt, hashedPassword, user, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _user["default"].findOne({
            email: body.email
          });
        case 2:
          userExist = _context3.sent;
          if (!userExist) {
            _context3.next = 5;
            break;
          }
          throw new Error("User with email ".concat(body.email, " already exists, try again!"));
        case 5:
          _context3.next = 7;
          return _bcrypt["default"].genSalt(10);
        case 7:
          salt = _context3.sent;
          _context3.next = 10;
          return _bcrypt["default"].hash(body.password, salt);
        case 10:
          hashedPassword = _context3.sent;
          _context3.next = 13;
          return _user["default"].create({
            email: body.email,
            password: hashedPassword,
            phoneNumber: body.phoneNumber,
            fullName: body.fullName
          });
        case 13:
          user = _context3.sent;
          _context3.next = 16;
          return _jsonwebtoken["default"].sign({
            userId: user._id
          }, process.env.JWT_SECRET);
        case 16:
          token = _context3.sent;
          return _context3.abrupt("return", token);
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function register(_x3) {
    return _ref3.apply(this, arguments);
  };
}();