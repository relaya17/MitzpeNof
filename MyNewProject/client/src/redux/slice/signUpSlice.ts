// redux/slice/SignUpSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface SignUpState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SignUpState = {
  status: 'idle',
  error: null,
};

export const signUpUser = createAsyncThunk(
  "signUp/signUpUser",
  async (userData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/signup", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'שגיאה ברישום');
    }
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default signUpSlice.reducer;
