import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import chatRoute from './routes/chatRoute.js';

const app = express();
dotenv.config();

connectDB();

app.get('/', (req, res) => res.send('API is running...'));

// Chat Route
app.use('/chat', chatRoute);

app.listen(
  process.env.PORT,
  console.log(`App running on port ${process.env.PORT}`)
);
