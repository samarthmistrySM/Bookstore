import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import {googleSignIn} from "../services/user.service";

export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.user.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const token = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: token,
      message: 'User login successfully'
    })
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const token = await UserService.register(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: token,
      message: 'User register successfully'
    })
  } catch (error) {
    next(error);
  }
}

export const googleLogin = async (req, res, next) => {
  try {
    const token = await UserService.googleSignIn(req.body);

    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: token,
      message: 'Google Authentication Successfully'
    })
  } catch (error) {
    next(error);
  }
}
