import express from 'express';
import * as bookController from '../controllers/book.controller.js';
import {userAuth} from "../middlewares/auth.middleware.js";
// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', bookController.getBooks);

router.put('/wishlist', userAuth, bookController.wishListBook);

router.put('/addToCart', userAuth, bookController.cartBook);

router.put('/removeFromCart',userAuth, bookController.removeFromCart);

export default router;
