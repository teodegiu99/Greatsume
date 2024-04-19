"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ShowHide {
    showImage: boolean;
    showAddress: boolean;
    showDateOfBirth: boolean;
    showBio: boolean;
    template: string;
  };

  const initialState: ShowHide = {
    showImage: true,
  showAddress: true,
  showDateOfBirth: true,
  showBio: true,
  template: "ClassicBlue",
  }

  const updateShowHideSlice = createSlice({
    name: "showHide",
    initialState,
    reducers: {
        setUpdateValues: (state, action: PayloadAction<ShowHide>) => {
          return { ...state, ...action.payload };
        }
    }
  })
  export const { setUpdateValues } = updateShowHideSlice.actions;

  export default updateShowHideSlice.reducer;