"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ShowHidePublic {
    showImage: boolean;
    showAddress: boolean;
    showDateOfBirth: boolean;
    showBio: boolean;
    publicLink: string; // <--- AGGIUNGI QUESTA RIGA
  };

  const initialState: ShowHidePublic = {
    showImage: true,
    showAddress: true,
    showDateOfBirth: true,
    showBio: true,
    publicLink: "", // <--- AGGIUNGI IL VALORE INIZIALE
  }

  const updateShowHidePublicSlice = createSlice({
    name: "showHidePublic",
    initialState,
    reducers: {
        setUpdateValues: (state, action: PayloadAction<Partial<ShowHidePublic>>) => { // Usa Partial per aggiornamenti flessibili
          return { ...state, ...action.payload };
        }
    }
  })
  export const { setUpdateValues } = updateShowHidePublicSlice.actions;

  export default updateShowHidePublicSlice.reducer;