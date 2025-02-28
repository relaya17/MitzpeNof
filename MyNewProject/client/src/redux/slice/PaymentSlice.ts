import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PaymentState {
  payer: string;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  receipt: string | null;
}

const initialState: PaymentState = {
  payer: '',
  amount: 0,
  paymentStatus: 'pending',
  receipt: null,
};

// Thunk לשליחת תשלום
export const addPayment = createAsyncThunk(
  'payment/addPayment',
  async (paymentData: { payer: string; amount: number }) => {
    const response = await axios.post('/api/payments', paymentData);
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentDetails: (state, action: PayloadAction<{ [key: string]: any }>) => {
      Object.assign(state, action.payload);
    },
    clearPaymentDetails: (state) => {
      state.payer = '';
      state.amount = 0;
      state.paymentStatus = 'pending';
      state.receipt = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPayment.pending, (state) => {
        state.paymentStatus = 'pending';
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.paymentStatus = 'completed';
        state.receipt = action.payload.receipt;
      })
      .addCase(addPayment.rejected, (state) => {
        state.paymentStatus = 'failed';
      });
  }
});

export const { setPaymentDetails, clearPaymentDetails } = paymentSlice.actions;
export default paymentSlice.reducer;
