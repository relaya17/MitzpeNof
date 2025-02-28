import express, { Response } from 'express';
import { Request } from 'express-serve-static-core';
import mongoose from 'mongoose';
import Payment from '../models/paymentModel';  // תיקון נתיב המודל שלך
import { generateReceipt } from '../server';  // תיקון נתיב הפונקציה שלך
import { PaymentRequestBody } from '../types/api';  // הוספת נתיב לטיפוס שלך

const app = express();

// middleware לניתוח בקשות JSON
app.use(express.json());

// התחברות למסד נתונים של MongoDB
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || '';

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // הפעלת השרת רק אחרי התחברות למסד נתונים
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// קריאה לקבלת כל התשלומים
export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);  // החזרת התשלומים
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payments' });
  }
};

// קריאה להוספת תשלום
export const addPayment = async (req: Request<{}, {}, PaymentRequestBody>, res: Response) => {
  try {
    const { payer, amount } = req.body;

    // בדיקה אם payer או amount לא קיימים
    if (!payer || typeof amount !== 'number') {  // Ensure `amount` is a number
      return res.status(400).json({ error: 'payer and amount are required, and amount must be a number' });
    }

    const newPayment = new Payment({ payer, amount });
    await newPayment.save();

    const chairmanName = "ישראל ישראלי";
    const pdfBuffer = await generateReceipt(payer, amount, chairmanName);  // הפקת קבלה כ-PDF
    res.status(201).json({ payment: newPayment, receipt: pdfBuffer });
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment and generating receipt' });
  }
};

// קריאה למחיקת תשלום
export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Payment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting payment' });
  }
};
