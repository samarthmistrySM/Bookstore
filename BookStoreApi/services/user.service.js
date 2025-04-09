import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUser = async (id) => {
  const data = await User.findById(id).populate('wishList').populate('cart.book');
  return data;
};

export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (!data) {
    throw new Error(`User with email ${body.email} does not exist`);
  }

  const isMatch = await bcrypt.compare(body.password, data.password);

  if (!isMatch) {
    throw new Error(`Password incorrect`);
  }

  const token = await jwt.sign({ userId: data._id }, process.env.JWT_SECRET);
  return token;
};

export const register = async (body) => {
  const userExist = await User.findOne({ email: body.email });
  if (userExist) {
    throw new Error(`User with email ${body.email} already exists, try again!`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const user = await User.create({
    email: body.email,
    password: hashedPassword,
    phoneNumber: body.phoneNumber,
    fullName: body.fullName
  });

  const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  return token;
};

export const googleSignIn = async (body) => {
  const {userData} = body;

  if (!userData) {
    throw new Error('Google data is required');
  }

  const { email, name } = userData;

  let user = await User.findOne({ email });

  if (!user) {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Bookstore@123", salt);

    user = await User.create({ email, fullName: name, password: hashedPassword });
  }

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  if(!jwtToken) {
    throw new Error(`Google Authentication Failed`);
  }
  return jwtToken;
}

