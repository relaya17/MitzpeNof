"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.addPayment = exports.getPayments = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const paymentModel_1 = __importDefault(require("../models/paymentModel")); // תיקון נתיב המודל שלך
const server_1 = require("../server"); // תיקון נתיב הפונקציה שלך
const app = (0, express_1.default)();
// middleware לניתוח בקשות JSON
app.use(express_1.default.json());
// התחברות למסד נתונים של MongoDB
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || '';
mongoose_1.default.connect(DB_URL)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // הפעלת השרת רק אחרי התחברות למסד נתונים
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
// קריאה לקבלת כל התשלומים
const getPayments = async (req, res) => {
    try {
        const payments = await paymentModel_1.default.find();
        res.status(200).json(payments); // החזרת התשלומים
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching payments' });
    }
};
exports.getPayments = getPayments;
// קריאה להוספת תשלום
const addPayment = async (req, res) => {
    try {
        const { payer, amount } = req.body;
        // בדיקה אם payer או amount לא קיימים
        if (!payer || typeof amount !== 'number') { // Ensure `amount` is a number
            return res.status(400).json({ error: 'payer and amount are required, and amount must be a number' });
        }
        const newPayment = new paymentModel_1.default({ payer, amount });
        await newPayment.save();
        const chairmanName = "ישראל ישראלי";
        const pdfBuffer = await (0, server_1.generateReceipt)(payer, amount, chairmanName); // הפקת קבלה כ-PDF
        res.status(201).json({ payment: newPayment, receipt: pdfBuffer });
    }
    catch (error) {
        res.status(500).json({ error: 'Error processing payment and generating receipt' });
    }
};
exports.addPayment = addPayment;
// קריאה למחיקת תשלום
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        await paymentModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Payment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting payment' });
    }
};
exports.deletePayment = deletePayment;
