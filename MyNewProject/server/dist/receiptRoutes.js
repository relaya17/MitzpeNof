"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReceipt = void 0;
const express_1 = __importDefault(require("express"));
const pdf_lib_1 = require("pdf-lib");
const router = express_1.default.Router();
// מערך לאחסון תשלומים
let payments = [];
// פונקציה ליצירת קבלה כ-PDF
const generateReceipt = async (payer, amount, chairmanName) => {
    const pdfDoc = await pdf_lib_1.PDFDocument.create();
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
exports.generateReceipt = generateReceipt;
// קריאה להוספת תשלום ויצירת קבלה
router.post('/generate-receipt', async (req, res) => {
    const { payer, amount } = req.body;
    const id = Math.random().toString(36).substring(7);
    const newPayment = { id, payer, amount };
    payments.push(newPayment);
    const chairmanName = "ישראל ישראלי";
    const pdfBuffer = await (0, exports.generateReceipt)(payer, amount, chairmanName);
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="receipt-${id}.pdf"`
    });
    res.status(201).send(pdfBuffer);
});
exports.default = router;
