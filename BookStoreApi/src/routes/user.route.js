import express from 'express';
import * as userController from '../controllers/user.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', userAuth, userController.getUser);

router.post('/login', userController.loginUser);

router.post('/register', userController.registerUser);

export default router;
