// src/redux/gardeningSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  date: string;
  wateringAmount: string;
  soilCheck: string;
  task: string;
  treatmentType: string[];
  treatmentDetails: string;
}

interface GardeningState {
  tasks: Task[];
}

const initialState: GardeningState = {
  tasks: [],
};

const gardeningSlice = createSlice({
  name: 'gardening',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { addTask } = gardeningSlice.actions;
export default gardeningSlice.reducer;
