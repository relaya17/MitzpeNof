// src/store/filesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface File {
  id: string;
  name: string;
  url: string;
}

interface FilesState {
  files: File[];
}

const initialState: FilesState = {
  files: [],
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
  },
});

export const { addFile, removeFile } = filesSlice.actions;
export default filesSlice.reducer;
