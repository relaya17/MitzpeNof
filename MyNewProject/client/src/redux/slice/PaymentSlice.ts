import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PaymentState {
  payer: string;
  amount: number;
  paymentStatus: string;
  receipt: string;
}

const initialState: PaymentState = {
  payer: '',
  amount: 0,
  paymentStatus: '',
  receipt: ''
};

// פעולה אסינכרונית להוספת תשלום
export const addPayment = createAsyncThunk(
  'payment/addPayment',
  async (paymentData: { payer: string; amount: number }) => {
    const response = await axios.post('/api/payments', paymentData);
    return response.data.payment;
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentDetails: (state, action: PayloadAction<{ payer?: string; amount?: number }>) => {
      state.payer = action.payload.payer || state.payer;
      state.amount = action.payload.amount || state.amount;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addPayment.fulfilled, (state, action) => {
      state.paymentStatus = 'success';
      state.receipt = action.payload._id;
    });
    builder.addCase(addPayment.rejected, (state) => {
      state.paymentStatus = 'failed';
    });
  }
});

export const { setPaymentDetails } = paymentSlice.actions;
export default paymentSlice.reducer;
