"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Loader {
  template: boolean;
}

const initialState: Loader = {
  template: false,
};

const loaderTemplateSlice = createSlice({
  name: "loaderTemplate",
  initialState,
  reducers: {
    setUpdateValues: (state, action: PayloadAction<boolean>) => {
      state.template = action.payload;
    },
  },
});
export const { setUpdateValues } = loaderTemplateSlice.actions;

export default loaderTemplateSlice.reducer;

