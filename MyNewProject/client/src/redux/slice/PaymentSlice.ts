import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  payer: string;
  amount: number;
}

const initialState: PaymentState = {
  payer: '',
  amount: 0
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentDetails: (state, action: PayloadAction<Partial<PaymentState>>) => {
      return { ...state, ...action.payload };
    },
    addPayment: (state, action: PayloadAction<PaymentState>) => {
      // כאן תוכל להוסיף את הלוגיקה לשליחה לשרת
    }
  }
});

export const { setPaymentDetails, addPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
