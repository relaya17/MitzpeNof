import mongoose, { Schema, Document } from 'mongoose';

interface IPayment extends Document {
  payer: string;
  amount: number;
}

const paymentSchema = new Schema<IPayment>({
  payer: { type: String, required: true },
  amount: { type: Number, required: true }
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;
