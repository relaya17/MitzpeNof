import express, { Request, Response } from 'express';
import { PDFDocument } from 'pdf-lib';

const router = express.Router();

// מערך לאחסון תשלומים
let payments: { id: string; payer: string; amount: number }[] = [];

// פונקציה ליצירת קבלה כ-PDF
export const generateReceipt = async (payer: string, amount: number, chairmanName: string) => {
  const pdfDoc = await PDFDocument.create();
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
};

// קריאה להוספת תשלום ויצירת קבלה
router.post('/generate-receipt', async (req: Request, res: Response) => {
  const { payer, amount } = req.body;
  const id = Math.random().toString(36).substring(7);

  const newPayment = { id, payer, amount };
  payments.push(newPayment);

  const chairmanName = "ישראל ישראלי";
  const pdfBuffer = await generateReceipt(payer, amount, chairmanName);
  
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="receipt-${id}.pdf"`
  });
  res.status(201).send(pdfBuffer);
});

export default router;
