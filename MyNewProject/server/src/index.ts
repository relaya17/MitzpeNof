// src/servers/index.ts
import express, { Request, Response } from 'express';
import signUpRoute from '../src/signUp'; // Adjust the path as necessary
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || '';

// התחברות ל-MongoDB
mongoose.connect(DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE']
}));
app.use(express.json());

// שימוש בראוט להרשמה
app.use('/api/auth', signUpRoute);

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });




// מערך לאחסון תשלומים
let payments: { id: string; payer: string; amount: number }[] = [];

// פונקציה להפקת קבלה כ-PDF
export const generateReceipt = async (payer: string, amount: number, chairmanName: string) => {
  try {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();
    const fontSize = 18;

    page.drawText(`קבלה לתשלום`, { x: 50, y: height - 50, size: fontSize });
    page.drawText(`שם הלקוח: ${payer}`, { x: 50, y: height - 80, size: fontSize });
    page.drawText(`סכום לתשלום: ${amount} ₪`, { x: 50, y: height - 110, size: fontSize });
    page.drawText(`יושב ראש אגודת מצפה נוף: ${chairmanName}`, { x: 50, y: height - 140, size: fontSize });
    page.drawText(`תאריך: ${new Date().toLocaleDateString()}`, { x: 50, y: height - 170, size: fontSize });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Error generating receipt PDF');
  }
};

// קריאה לקבלת כל התשלומים
app.get('/api/payments', (req: Request, res: Response) => {
  try {
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payments' });
  }
});

// קריאה להוספת תשלום
app.post('/api/payments', async (req: Request, res: Response) => {
  try {
    const { payer, amount } = req.body;
    const id = Math.random().toString(36).substring(7);
    const newPayment = { id, payer, amount };
    payments.push(newPayment);

    const chairmanName = "ישראל ישראלי";
    const pdfBuffer = await generateReceipt(payer, amount, chairmanName);
    res.status(201).json({ payment: newPayment, receipt: pdfBuffer });
  } catch (error) {
    console.error('Error processing payment and generating receipt:', error);
    res.status(500).json({ error: 'Error processing payment and generating receipt' });
  }
});

// שמירה על השרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
