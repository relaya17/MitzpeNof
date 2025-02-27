import { Request, Response } from 'express';
import Payment from '../models/paymentModel';
import { generateReceipt } from '../server';

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payments' });
  }
};

export const addPayment = async (req: Request, res: Response) => {
  try {
    const { payer, amount } = req.body;
    const newPayment = new Payment({ payer, amount });
    await newPayment.save();

    const chairmanName = "ישראל ישראלי";
    const pdfBuffer = await generateReceipt(payer, amount, chairmanName);
    res.status(201).json({ payment: newPayment, receipt: pdfBuffer });
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment and generating receipt' });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Payment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting payment' });
  }
};
