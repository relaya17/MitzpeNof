"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel")); // עדכון נתיב המודל
const router = express_1.default.Router();
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // בדיקה אם המשתמש כבר קיים
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'משתמש כבר קיים' });
        }
        // הצפנת סיסמה
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // יצירת משתמש חדש
        const newUser = new userModel_1.default({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'משתמש נוצר בהצלחה' });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'שגיאה ביצירת משתמש' });
    }
});
exports.default = router;
