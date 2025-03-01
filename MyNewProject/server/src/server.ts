import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import signUpRoute from './routes/signUpRoute';
import { addPayment, deletePayment, getPayments } from './controllers/paymentController';

const app = express();
const port = 5000;

dotenv.config();

// לאפשר בקשות מ-CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE']
}));

app.use(express.json());

app.use('/api/signup', signUpRoute);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/payments_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// נתיבים עבור פונקציות התשלומים
app.get('/api/payments', getPayments);
app.post('/api/payments', addPayment);
app.delete('/api/payments/:id', deletePayment);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
