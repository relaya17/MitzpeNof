import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel'; 
const router = express.Router();

// POST /api/signup
router.post('/', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // בדיקה אם כל השדות קיימים
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'נא למלא את כל השדות' });
  }

  try {
    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'משתמש כבר קיים' });
    }

    // הצפנת סיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת משתמש חדש
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'משתמש נוצר בהצלחה' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'שגיאה ביצירת משתמש' });
  }
});

export default router;
