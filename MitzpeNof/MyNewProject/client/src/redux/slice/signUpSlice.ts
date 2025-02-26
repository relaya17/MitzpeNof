import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  name: string;
  email: string;
  password: string;
}

interface SignUpState {
  success: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: SignUpState = {
  success: false,
  loading: false,
  error: null,
};

export const signUpUser = createAsyncThunk(
  "signUp/signUpUser",
  async (user: User) => {
    const response = await axios.post("/api/users", user);
    return response.data;
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה ברישום המשתמש";
      });
  },
});

export default signUpSlice.reducer;
