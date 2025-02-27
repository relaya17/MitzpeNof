// src/store/employeesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
  id: string;
  name: string;
  role: string;
  hoursWorked: number;  // הוספתי את השדה hoursWorked
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
    updateEmployeeHours: (state, action: PayloadAction<{ id: string, hours: number }>) => {
      const { id, hours } = action.payload;
      const employee = state.employees.find(employee => employee.id === id);
      if (employee) {
        employee.hoursWorked = hours;  // עדיין מעדכן ב-hoursWorked
      }
    },
    
  },
});

export const { addEmployee, removeEmployee, updateEmployeeHours } = employeesSlice.actions;
export default employeesSlice.reducer;
