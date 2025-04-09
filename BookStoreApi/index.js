import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';
import database from './config/database.js';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware.js';
import logger, { logStream } from './config/logger.js';

import morgan from 'morgan';

dotenv.config();
const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny', { stream: logStream }));

database();
app.use(`/api/${api_version}`, routes());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
});
