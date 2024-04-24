"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StringState {
  value: string;
}

const initialState: StringState = {
  value: "TopBar", // Valore predefinito della variabile int
};

const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = mobileSlice.actions;

export default mobileSlice.reducer;