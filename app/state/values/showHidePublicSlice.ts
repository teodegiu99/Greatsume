"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ShowHidePublic {
    showImage: boolean;
    showAddress: boolean;
    showDateOfBirth: boolean;
    showBio: boolean;
  };

  const initialState: ShowHidePublic = {
    showImage: true,
  showAddress: true,
  showDateOfBirth: true,
  showBio: true,
  }

  const updateShowHidePublicSlice = createSlice({
    name: "showHidePublic",
    initialState,
    reducers: {
        setUpdateValues: (state, action: PayloadAction<ShowHidePublic>) => {
          return { ...state, ...action.payload };
        }
    }
  })
  export const { setUpdateValues } = updateShowHidePublicSlice.actions;

  export default updateShowHidePublicSlice.reducer;