import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';

interface SignUpRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

const router = express.Router();

router.post('/signup', async (req: SignUpRequest, res: Response) => {
  const { name, email, password } = req.body;

  try {
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
  } catch (error: unknown) {
    console.error('Error creating user:', error);

    let errorMessage = 'שגיאה ביצירת משתמש';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({ message: errorMessage });
  }
});

export default router;
