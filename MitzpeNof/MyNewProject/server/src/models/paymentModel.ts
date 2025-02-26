import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  payer: string;
  amount: number;
}

const PaymentSchema = new Schema({
  payer: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default mongoose.model<IPayment>('Payment', PaymentSchema);
