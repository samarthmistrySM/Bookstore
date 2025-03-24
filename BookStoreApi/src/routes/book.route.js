import express from 'express';
import * as bookController from '../controllers/book.controller';
import {userAuth} from "../middlewares/auth.middleware";
// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', bookController.getBooks);

router.put('/wishlist', userAuth, bookController.wishListBook);

router.put('/addToCart', userAuth, bookController.cartBook);

router.put('/removeFromCart',userAuth, bookController.removeFromCart);

export default router;
