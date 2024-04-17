"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IntState {
  value: number;
}

const initialState: IntState = {
  value: 0, // Valore predefinito della variabile int
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = templateSlice.actions;

export default templateSlice.reducer;