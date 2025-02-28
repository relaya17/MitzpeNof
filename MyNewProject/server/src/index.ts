// import express, { Request, Response } from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import Payment from './models/payments'; // עדכון נתיב המודל
// import paymentsRoutes from './models/payments'; // Adjust the path as necessary

// dotenv.config();

// let payments: { id: string; payer: string; amount: number }[] = [];

// app.use(express.json());  // ווידוא שהמידלוור שממיר את הנתונים ל-req.body נמצא כאן
// const PORT = process.env.PORT || 5000;
// const DB_URL = process.env.DB_URL || '';
// mongoose.connect(DB_URL)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });





// // קריאה לקבלת כל התשלומים
// app.get('/api/payments', async (req: Request, res: Response) => {
//   try {
//     const payments = await Payment.find();  // חפש את כל התשלומים
//     res.status(200).json(payments);  // שלח את התשלומים בתגובה
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching payments' });
//   }
// });
// app.post('/api/payments', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { payer, amount } = req.body;
//     const id = Math.random().toString(36).substring(7);
//     const newPayment = { id, payer, amount };
//     payments.push(newPayment);

//     const chairmanName = "ישראל ישראלי"; 
//     const pdfBuffer = await generateReceipt(payer, amount, chairmanName);
//     res.status(201).json({ payment: newPayment, receipt: pdfBuffer });
//   } catch (error) {
//     console.error('Error processing payment and generating receipt:', error);
//     res.status(500).json({ error: 'Error processing payment and generating receipt' });
//   }
// });

// // קריאה לקבלת כל התשלומים
// app.get('/api/payments', (req: Request, res: Response) => {
//   try {
//     res.status(200).json(payments);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching payments' });
//   }
// });






//   // שמירה על השרת
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });