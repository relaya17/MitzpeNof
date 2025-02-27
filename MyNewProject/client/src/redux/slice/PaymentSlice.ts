// redux/slice/PaymentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  payer: string;
  amount: number;
  status: string;
}

const initialState: PaymentState = {
  payer: '',
  amount: 0,
  status: 'pending'
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentDetails: (state, action: PayloadAction<{ payer: string; amount: number }>) => {
      state.payer = action.payload.payer;
      state.amount = action.payload.amount;
    },
    clearPaymentDetails: (state) => {
      state.payer = '';
      state.amount = 0;
      state.status = 'pending';
    }
  }
});

// ייצוא של הפעולות
export const { setPaymentDetails, clearPaymentDetails } = paymentSlice.actions;

// ייצוא של ה-reducer
export default paymentSlice.reducer;
