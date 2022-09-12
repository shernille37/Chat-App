import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';

import chatRoute from './routes/chatRoute.js';
import userRoute from './routes/userRoute.js';

import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));

// User Routes
app.use('/api/users', userRoute);
// Chat Routes
app.use('/api/chat', chatRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(
  process.env.PORT,
  console.log(
    `App running in ${process.env.NODE_ENV}mode on port ${process.env.PORT}`
      .green.bold
  )
);
