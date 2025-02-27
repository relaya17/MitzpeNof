import { Request, Response } from 'express';
import Payment from '../models/paymentModel';  // תיקון נתיב המודל שלך
import { generateReceipt } from '../server';  // תיקון נתיב הפונקציה שלך

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
export const addPayment = async (req: Request, res: Response) => {
  try {
    const { payer, amount } = req.body;
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
