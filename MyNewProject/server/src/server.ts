import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE']
}));

app.use(express.json());
app.use(paymentRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/payments_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
