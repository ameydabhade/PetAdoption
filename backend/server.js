import express from 'express';
import mongoose from 'mongoose';
import { Routes } from './Routes/Routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5800;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connection is successful');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

Routes(app);

app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  if (err.status === 404) {
    return res.status(404).json({ message: 'Resource Not Found' });
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
