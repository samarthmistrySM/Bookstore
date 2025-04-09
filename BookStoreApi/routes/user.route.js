import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', userAuth, userController.getUser);

router.post('/login', userController.loginUser);

router.post('/register', userController.registerUser);

router.post('/google-login',userController.googleLogin)

export default router;
