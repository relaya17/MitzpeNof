// src/redux/slices/paymentSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// הגדרת מצב התשלום
interface PaymentState {
  payer: string;
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // מצב הבקשה
  receipt: string | null; // הקבלה שהתקבלה מהשרת
}

// הגדרת ערך ברירת המחדל של התשלום
const initialState: PaymentState = {
  payer: '',
  amount: 100,
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  status: 'idle',
  receipt: null,
};

// קריאת API אסינכרונית להוספת תשלום
export const addPayment = createAsyncThunk(
  'payment/addPayment',
  async (paymentData: PaymentState, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/payments', paymentData);
      return response.data; // מחזיר את התגובה מהשרת (תשלום + קבלה)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Error adding payment');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentDetails: (state, action: PayloadAction<Partial<PaymentState>>) => {
      return { ...state, ...action.payload };
    },
    clearPaymentDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPayment.pending, (state) => {
        state.status = 'loading'; // התחלת הטעינה
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.status = 'succeeded'; // סיום בהצלחה
        state.receipt = action.payload.receipt; // שמירת הקבלה שהתקבלה מהשרת
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.status = 'failed'; // סיום עם שגיאה
        console.error('Payment error:', action.payload);
      });
  },
});

export const { setPaymentDetails, clearPaymentDetails } = paymentSlice.actions;
export default paymentSlice.reducer;
