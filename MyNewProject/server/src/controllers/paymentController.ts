import { Request, Response } from 'express';
import Payment from '../models/paymentModel'; // מודל לתשלומים

export const addPayment = async (req: Request, res: Response) => {
  const { payer, amount } = req.body;

  try {
    const newPayment = new Payment({ payer, amount });
    await newPayment.save();
    res.status(201).json({ payment: newPayment });
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment' });
  }
};

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payments' });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Payment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting payment' });
  }
};
