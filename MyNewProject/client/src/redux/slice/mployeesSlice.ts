// src/store/employeesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
  id: string;
  name: string;
  role: string;
}

interface EmployeesState {
  employees: Employee[];
}

const initialState: EmployeesState = {
  employees: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    removeEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
    },
  },
});

export const { addEmployee, removeEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
