"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromCart = exports.getAllBooks = exports.addToWishList = exports.addToCart = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _book = _interopRequireDefault(require("../models/book.model"));
var _user = _interopRequireDefault(require("../models/user.model"));
var getAllBooks = exports.getAllBooks = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _book["default"].find();
        case 2:
          data = _context.sent;
          return _context.abrupt("return", data);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getAllBooks() {
    return _ref.apply(this, arguments);
  };
}();
var addToWishList = exports.addToWishList = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(userId, bookId) {
    var book, user, bookExist;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _book["default"].findById(bookId);
        case 2:
          book = _context2.sent;
          if (book) {
            _context2.next = 5;
            break;
          }
          throw new Error('Book not found');
        case 5:
          _context2.next = 7;
          return _user["default"].findById(userId);
        case 7:
          user = _context2.sent;
          if (user) {
            _context2.next = 10;
            break;
          }
          throw new Error('User not found');
        case 10:
          bookExist = user.wishList.includes(bookId);
          if (bookExist) {
            _context2.next = 18;
            break;
          }
          user.wishList.push(bookId);
          _context2.next = 15;
          return user.save();
        case 15:
          return _context2.abrupt("return", 'book added to wishlist');
        case 18:
          user.wishList.pull(bookId);
          _context2.next = 21;
          return user.save();
        case 21:
          return _context2.abrupt("return", 'book removed from wishlist');
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function addToWishList(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var addToCart = exports.addToCart = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(userId, bookId) {
    var book, user, itemExist;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _book["default"].findById(bookId);
        case 2:
          book = _context3.sent;
          if (book) {
            _context3.next = 5;
            break;
          }
          throw new Error('Book not found');
        case 5:
          _context3.next = 7;
          return _user["default"].findById(userId);
        case 7:
          user = _context3.sent;
          if (user) {
            _context3.next = 10;
            break;
          }
          throw new Error('User not found');
        case 10:
          itemExist = user.cart.find(function (item) {
            return item.book.equals(bookId);
          });
          if (itemExist) {
            itemExist.quantity += 1;
          } else {
            user.cart.push({
              book: book._id,
              quantity: 1
            });
          }
          _context3.next = 14;
          return user.save();
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function addToCart(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var removeFromCart = exports.removeFromCart = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(userId, bookId) {
    var book, user, itemIndex, item;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _book["default"].findById(bookId);
        case 2:
          book = _context4.sent;
          if (book) {
            _context4.next = 5;
            break;
          }
          throw new Error('Book not found');
        case 5:
          _context4.next = 7;
          return _user["default"].findById(userId);
        case 7:
          user = _context4.sent;
          if (user) {
            _context4.next = 10;
            break;
          }
          throw new Error('User not found');
        case 10:
          itemIndex = user.cart.findIndex(function (item) {
            return item.book.equals(bookId);
          });
          if (!(itemIndex === -1)) {
            _context4.next = 13;
            break;
          }
          throw new Error("Item Not found in cart");
        case 13:
          item = user.cart[itemIndex];
          if (item.quantity === 1) {
            user.cart.splice(itemIndex, 1);
          } else {
            item.quantity -= 1;
          }
          _context4.next = 17;
          return user.save();
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function removeFromCart(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();