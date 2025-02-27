// src/store/forRentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// הגדרת מבנה הדירה להשכרה
interface Apartment {
  id: number;
  address: string;
  price: number;
  description: string;
  image: string;
}

// הגדרת ה-state של דירות להשכרה
interface ForRentState {
  apartments: Apartment[];
}

const initialState: ForRentState = {
  apartments: [
    {
      id: 1,
      address: "רחוב דוגמה 1, תל אביב",
      price: 5000,
      description: "דירה 2 חדרים, קרובה לחוף הים",
      image: "apartment1.jpg",
    },
    {
      id: 2,
      address: "רחוב דוגמה 2, ירושלים",
      price: 7000,
      description: "דירה 3 חדרים, מרכז העיר",
      image: "apartment2.jpg",
    },
    // הוספת דירות נוספות כאן...
  ],
};

const forRentSlice = createSlice({
  name: "forRent",
  initialState,
  reducers: {
    addApartment: (state, action: PayloadAction<Apartment>) => {
      state.apartments.push(action.payload);
    },
    removeApartment: (state, action: PayloadAction<number>) => {
      state.apartments = state.apartments.filter(
        (apartment) => apartment.id !== action.payload
      );
    },
  },
});

export const { addApartment, removeApartment } = forRentSlice.actions;
export default forRentSlice.reducer;
