import Book from '../models/book.model.js';
import User from '../models/user.model.js';

export const getAllBooks = async () => {
  const data = await Book.find();
  return data;
};

export const addToWishList = async (userId, bookId) => {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error('Book not found');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const bookExist = user.wishList.includes(bookId);

  if (!bookExist) {
    user.wishList.push(bookId);
    await user.save();
    return 'book added to wishlist';
  } else {
    user.wishList.pull(bookId);
    await user.save();
    return 'book removed from wishlist';
  }
};

export const addToCart = async (userId, bookId) => {
    const book = await Book.findById(bookId);
    if (!book) {
        throw new Error('Book not found');
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const itemExist = user.cart.find((item) => item.book.equals(bookId));
    if(itemExist) {
        itemExist.quantity += 1;
    } else {
        user.cart.push({ book: book._id, quantity: 1 });
    }
    await user.save();
};

export const removeFromCart = async (userId, bookId) => {
    const book = await Book.findById(bookId);
    if (!book) {
        throw new Error('Book not found');
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const itemIndex = user.cart.findIndex((item) => item.book.equals(bookId));

    if(itemIndex === -1) {
        throw new Error("Item Not found in cart");
    }

    const item = user.cart[itemIndex];

    if (item.quantity === 1) {
        user.cart.splice(itemIndex, 1);
    } else {
        item.quantity -= 1;
    }
    await user.save();
}
