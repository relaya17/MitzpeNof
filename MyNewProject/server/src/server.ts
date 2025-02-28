import express, { Request, Response } from 'express';
import cors from 'cors';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import User from './models/userModel';
import signUpRoute from './types/signUp';
import { addPayment, deletePayment, getPayments } from './controllers/paymentController';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

interface PaymentRequestBody {
  payer: string;
  amount: number;
}
// הגדרת השרת
const app = express();
const port = 5000; // יצירת פורט 5000 לשרת
dotenv.config();
// לאפשר בקשות מ-CORS
app.use(cors({
  origin: 'http://localhost:3000', // שים פה את כתובת הקליינט שלך
  methods: ['GET', 'POST', 'DELETE']
}));

app.use(express.json());

app.use('/api/signup', signUpRoute);

// התחברות למסד הנתונים
mongoose.connect('mongodb://localhost:27017/your_database_name')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// נתיבים עבור פונקציות התשלומים
app.get('/api/payments', getPayments);
app.post('/api/payments', addPayment);
app.delete('/api/payments/:id', deletePayment);


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




// קריאה למחיקת תשלום
// קריאה להוספת תשלום



// שמירה על השרת
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
