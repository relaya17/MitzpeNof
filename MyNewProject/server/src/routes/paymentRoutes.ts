import { Router } from 'express';
import { addPayment, getPayments, deletePayment } from '../controllers/paymentController';

const router = Router();

router.post('/api/payments', addPayment);
router.get('/api/payments', getPayments);
router.delete('/api/payments/:id', deletePayment);

export default router;
