import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../src/models/userModel'; // עדכון נתיב המודל

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

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
