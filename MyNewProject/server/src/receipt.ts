// server/src/receipt.ts
import { Request, Response } from "express";
import { PDFDocument } from "pdf-lib";

export const generateReceipt = async (req: Request, res: Response) => {
  const { payer, amount, chairmanName } = req.body;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const { width, height } = page.getSize();
  const fontSize = 18;

  page.drawText(`קבלה לתשלום`, { x: 50, y: height - 50, size: fontSize });
  page.drawText(`שם הלקוח: ${payer}`, {
    x: 50,
    y: height - 80,
    size: fontSize,
  });
  page.drawText(`סכום לתשלום: ${amount} ₪`, {
    x: 50,
    y: height - 110,
    size: fontSize,
  });
  page.drawText(`יושב ראש אגודת מצפה נוף: ${chairmanName}`, {
    x: 50,
    y: height - 140,
    size: fontSize,
  });
  page.drawText(`תאריך: ${new Date().toLocaleDateString()}`, {
    x: 50,
    y: height - 170,
    size: fontSize,
  });

  const pdfBytes = await pdfDoc.save();
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdfBytes);
};
