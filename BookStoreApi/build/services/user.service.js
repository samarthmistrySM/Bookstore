"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = exports.googleSignIn = exports.getUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _require = require('google-auth-library'),
  OAuth2Client = _require.OAuth2Client;
var client = new OAuth2Client('114689921260-5htdpd4j9sep13v3lkk21ob171739ra2.apps.googleusercontent.com');
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user["default"].findById(id).populate('wishList').populate('cart.book');
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
var googleSignIn = exports.googleSignIn = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var userData, email, name, user, salt, hashedPassword, jwtToken;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          userData = body.userData;
          if (userData) {
            _context4.next = 3;
            break;
          }
          throw new Error('Google data is required');
        case 3:
          email = userData.email, name = userData.name;
          _context4.next = 6;
          return _user["default"].findOne({
            email: email
          });
        case 6:
          user = _context4.sent;
          if (user) {
            _context4.next = 17;
            break;
          }
          _context4.next = 10;
          return _bcrypt["default"].genSalt(10);
        case 10:
          salt = _context4.sent;
          _context4.next = 13;
          return _bcrypt["default"].hash("Bookstore@123", salt);
        case 13:
          hashedPassword = _context4.sent;
          _context4.next = 16;
          return _user["default"].create({
            email: email,
            fullName: name,
            password: hashedPassword
          });
        case 16:
          user = _context4.sent;
        case 17:
          jwtToken = _jsonwebtoken["default"].sign({
            userId: user._id
          }, process.env.JWT_SECRET);
          if (jwtToken) {
            _context4.next = 20;
            break;
          }
          throw new Error("Google Authentication Failed");
        case 20:
          return _context4.abrupt("return", jwtToken);
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function googleSignIn(_x4) {
    return _ref4.apply(this, arguments);
  };
}();