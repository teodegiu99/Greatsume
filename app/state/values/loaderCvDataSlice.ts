"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CvData {
  cvdata: boolean;
}

const initialState: CvData = {
    cvdata: false,
};

const loaderCvDataSlice = createSlice({
  name: "loaderCvData",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<boolean>) => {
      state.cvdata = action.payload;
    },
  },
});

export const { setValue } = loaderCvDataSlice.actions;

export default loaderCvDataSlice.reducer;