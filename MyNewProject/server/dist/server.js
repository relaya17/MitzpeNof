"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReceipt = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pdf_lib_1 = require("pdf-lib");
const fontkit_1 = __importDefault(require("@pdf-lib/fontkit"));
const signUp_1 = __importDefault(require("./types/signUp"));
const paymentController_1 = require("./controllers/paymentController");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// הגדרת השרת
const app = (0, express_1.default)();
const port = 5000; // יצירת פורט 5000 לשרת
dotenv_1.default.config();
// לאפשר בקשות מ-CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // שים פה את כתובת הקליינט שלך
    methods: ['GET', 'POST', 'DELETE']
}));
app.use(express_1.default.json());
app.use('/api/signup', signUp_1.default);
// התחברות למסד הנתונים
mongoose_1.default.connect('mongodb://localhost:27017/your_database_name')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
// נתיבים עבור פונקציות התשלומים
app.get('/api/payments', paymentController_1.getPayments);
app.post('/api/payments', paymentController_1.addPayment);
app.delete('/api/payments/:id', paymentController_1.deletePayment);
// פונקציה להפקת קבלה כ-PDF
const generateReceipt = async (payer, amount, chairmanName) => {
    try {
        const pdfDoc = await pdf_lib_1.PDFDocument.create();
        pdfDoc.registerFontkit(fontkit_1.default);
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
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('Error generating receipt PDF');
    }
};
exports.generateReceipt = generateReceipt;
// קריאה למחיקת תשלום
// קריאה להוספת תשלום
// שמירה על השרת
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
