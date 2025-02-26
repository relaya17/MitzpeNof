 // src/servers/signUp.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User'; // מודל המשתמש

const router = express.Router();

// פונקציה להוספת משתמש חדש
router.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // ביצוע חישוב לסיסמה
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

export default router;
