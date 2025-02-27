import express, { Request, Response } from 'express';
import cors from 'cors';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import paymentsRoutes from './routes/payments'; // Adjust the path as necessary

// הגדרת השרת
const app = express();
const port = 5000; // יצירת פורט 5000 לשרת

// לאפשר בקשות מ-CORS
app.use(cors({
  origin: 'http://localhost:3000', // שים פה את כתובת הקליינט שלך
  methods: ['GET', 'POST', 'DELETE']
}));

app.use(express.json());
app.use('/api/payments', paymentsRoutes);

// לאפשר פרסום נתונים כ-JSON
app.use(express.json());

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
    res.status(500).json({ error: 'Error processing payment and generating receipt' });
  }
});

// קריאה למחיקת תשלום
// קריאה להוספת תשלום
app.post('/api/payments', async (req: Request, res: Response): Promise<void> => {
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
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
