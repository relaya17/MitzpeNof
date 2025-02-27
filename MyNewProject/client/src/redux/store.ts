import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './slice/employeesSlice';
import gardeningReducer from './slice/gardeningSlice';
import poolMaintenanceReducer from './slice/poolMaintenanceSlice';
import repairTrackingReducer from './slice/repairTrackingSlice';
import newResidentApprovalReducer from './slice/newResidentApprovalSlice';
import blogReducer from './slice/blogSlice';
import votingReducer from './slice/votingSlice';
import settingsReducer from "./slice/settingsSlice";
import forSaleReducer from "./slice/forSaleSlice";
import forRentReducer from "./slice/forRentSlice";
import paymentReducer from './slice/PaymentSlice';
import navbarReducer from './slice/navbarSlice'; // חיבור ה-navbar
import secondNavbarReducer from './slice/SecondNavbar';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    gardening: gardeningReducer,
    poolMaintenance: poolMaintenanceReducer,
    repairTracking: repairTrackingReducer,
    files: newResidentApprovalReducer,
    blog: blogReducer,
    voting: votingReducer,
    settings: settingsReducer,
    forSale: forSaleReducer,
    forRent: forRentReducer,
    payment: paymentReducer,
    navbar: navbarReducer, 
    secondNavbar: secondNavbarReducer, // הוספת ה-navbar החדש

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
