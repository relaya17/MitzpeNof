import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../redux/slice/employeesSlice';
import gardeningReducer from '../redux/slice/gardeningSlice';
import poolMaintenanceReducer from '../redux/slice/poolMaintenanceSlice';
import repairTrackingReducer from '../redux/slice/repairTrackingSlice';
import newResidentApprovalReducer from '../redux/slice/newResidentApprovalSlice';
import blogReducer from '../redux/slice/blogSlice';
import votingReducer from '../redux/slice/votingSlice';
import settingsReducer from "../redux/slice/settingsSlice";
import forSaleReducer from "../redux/slice/forSaleSlice";
import forRentReducer from "../redux/slice/forRentSlice";
import paymentReducer from '../redux/slice/PaymentSlice';
import navbarReducer from '../redux/slice/navbarSlice'; // חיבור ה-navbar
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
