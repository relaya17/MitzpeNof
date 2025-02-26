 // src/redux/slice/SignUpSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignUpState {
  email: string;
  password: string;
  name: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SignUpState = {
  email: '',
  password: '',
  name: '',
  status: 'idle',
};

// פעולה אסינכרונית לרישום משתמש
export const signUpUser = createAsyncThunk(
  'signup/signUpUser',
  async (userData: SignUpState, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', userData);
      return response.data; // החזרת התגובה מהשרת
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Error signing up');
    }
  }
);

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignUpDetails: (state, action: PayloadAction<Partial<SignUpState>>) => {
      return { ...state, ...action.payload };
    },
    clearSignUpDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading'; // התחלת הרישום
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded'; // סיום בהצלחה
      })
      .addCase(signUpUser.rejected, (state) => {
        state.status = 'failed'; // שגיאה
      });
  },
});

export const { setSignUpDetails, clearSignUpDetails } = signUpSlice.actions;
export default signUpSlice.reducer;
