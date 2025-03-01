import { Request, Response } from 'express';
import Payment from '../models/paymentModel';
import { generateReceipt } from '../receipt'; // וודא שהנתיב נכון

interface PaymentRequestBody {
  payer: string;
  amount: number;
}
export const addPayment = async (req: Request<{}, {}, PaymentRequestBody>, res: Response) => {
  try {
    const { payer, amount }: PaymentRequestBody = req.body;

    if (!payer || !amount) {
      return res.status(400).json({ error: 'נא למלא את כל השדות' });
    }

    // יצירת אובייקט Payment חדש ושמירתו
    const newPayment = new Payment({ payer, amount });
    await newPayment.save();

    // יצירת קבלה כ-PDF
    const chairmanName = "יושב ראש אגודת מצפה נוף"; // לדוגמה
    const pdfBytes = await generateReceipt(payer, amount, chairmanName);

    // לוודא שpdfBytes הוא Buffer ולא null או stream
    if (Buffer.isBuffer(pdfBytes)) {
      res.status(201)
        .setHeader('Content-Type', 'application/pdf')
        .send(pdfBytes);
    } else {
      throw new Error('קבלה לא נוצרה בצורה תקינה');
    }
  } catch (error) {
    console.error('שגיאה בהוספת תשלום:', error);
    res.status(500).json({ error: 'שגיאה בשרת, נסה שוב מאוחר יותר' });
  }
};