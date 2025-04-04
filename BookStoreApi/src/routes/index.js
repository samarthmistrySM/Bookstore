import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from "./book.route";

const routes = () => {
  router.use('/users', userRoute);
  router.use('/books', bookRoute);

  return router;
};

export default routes;
