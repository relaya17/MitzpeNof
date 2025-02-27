// src/controllers/paymentController.ts
import { Request, Response } from 'express';
import { generateReceipt } from '../utils/pdfUtils';

let payments: { id: string; payer: string; amount: number }[] = [];

export const createReceipt = async (req: Request, res: Response) => {
  const { payer, amount } = req.body;
  const id = Math.random().toString(36).substring(7);  
  payments.push({ id, payer, amount });
  const chairmanName = "ישראל ישראלי";

  try {
    const pdfBuffer = await generateReceipt(payer, amount, chairmanName);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="receipt-${id}.pdf"`
    }).status(201).send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Error generating receipt PDF' });
  }
};
