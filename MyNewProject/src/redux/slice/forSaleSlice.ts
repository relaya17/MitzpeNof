// src/store/forSaleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// הגדרת מבנה הדירה
interface Apartment {
  id: number;
  address: string;
  price: number;
  description: string;
  image: string;
}

// הגדרת ה-state
interface ForSaleState {
  apartments: Apartment[];
}

const initialState: ForSaleState = {
  apartments: [
    {
      id: 1,
      address: "רחוב דוגמה 1, תל אביב",
      price: 1500000,
      description: "דירה 3 חדרים, קרובה למרכז העיר",
      image: "apartment1.jpg",
    },
    {
      id: 2,
      address: "רחוב דוגמה 2, ירושלים",
      price: 2000000,
      description: "דירה 4 חדרים, עם נוף לים",
      image: "apartment2.jpg",
    },
    // הוספת דירות נוספות כאן...
  ],
};

const forSaleSlice = createSlice({
  name: "forSale",
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

export const { addApartment, removeApartment } = forSaleSlice.actions;
export default forSaleSlice.reducer;
