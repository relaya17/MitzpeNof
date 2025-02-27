import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPayments = createAsyncThunk('payments/fetchPayments', async () => {
  const response = await axios.get('http://localhost:5000/api/payments');
  return response.data;
});

export const addPayment = createAsyncThunk('payments/addPayment', async (payment: { payer: string, amount: number }) => {
  const response = await axios.post('http://localhost:5000/api/payments', payment);
  return response.data;
});

export const deletePayment = createAsyncThunk('payments/deletePayment', async (id: string) => {
  await axios.delete(`http://localhost:5000/api/payments/${id}`);
  return id;
});

interface Payment {
  id: string;
  payer: string;
  amount: number;
}

interface PaymentState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload);
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.payments = state.payments.filter(payment => payment.id !== action.payload);
      });
  }
});

export default paymentSlice.reducer;
