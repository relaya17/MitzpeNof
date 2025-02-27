// src/redux/slices/paymentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  payer: string;
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const initialState: PaymentState = {
  payer: '',
  amount: 100, // ברירת מחדל
  cardNumber: '',
  expiryDate: '',
  cvv: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentDetails: (state, action: PayloadAction<Partial<PaymentState>>) => {
      return { ...state, ...action.payload };
    },
    clearPaymentDetails: () => initialState,
  },
});

export const { setPaymentDetails, clearPaymentDetails } = paymentSlice.actions;
export default paymentSlice.reducer;
