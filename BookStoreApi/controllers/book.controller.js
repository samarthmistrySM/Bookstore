import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service.js';

export const getBooks = async (req, res, next) => {
  try {
    const data = await BookService.getAllBooks();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Books fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const wishListBook = async (req, res, next) => {
  try {
    const message = await BookService.addToWishList(
      req.user.userId,
      req.body.bookId
    );
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: message
    });
  } catch (error) {
    next(error);
  }
};

export const cartBook = async (req, res, next) => {
  try {
    await BookService.addToCart(req.user.userId, req.body.bookId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'book added to cart'
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    await BookService.removeFromCart(req.user.userId, req.body.bookId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'book removed from cart'
    });
  } catch (error) {
    next(error);
  }
};
