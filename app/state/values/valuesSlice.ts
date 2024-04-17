"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ValuesState {
    name: string,
    surname: string,
    address: string,
    dateOfBirth: string,
    relocation: string,
    phone: string,
    email: string,
    linkedin: string,
    github: string,
    dribble: string,
    website: string,
    bio: string,
    desiredJob: string,
    ral: string,
    experience: [
      {
        years: string,
        title: string,
        exps: string,
      },
    ],
    education: [
      {
        eyears: string,
        etitle: string,
        edu: string,
      },
    ],
    skillss: string[],
    softSkillss: string[],
    langSkillss: string[],
    image: string,
  };

  const initialState: ValuesState = {
    name: "",
    surname: "",
    address: "",
    dateOfBirth: "",
    relocation: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    dribble: "",
    website: "",
    bio: "",
    desiredJob: "",
    ral: "",
    experience: [
      {
        years: "",
        title: "",
        exps: "",
      },
    ],
    education: [
      {
        eyears: "",
        etitle: "",
        edu: "",
      },
    ],
    skillss: [""],
    softSkillss: [""],
    langSkillss: [""],
    image: "",
  }

  const updateValuesSlice = createSlice({
    name: "updateValues",
    initialState,
    reducers: {
        setUpdateValues: (state, action: PayloadAction<ValuesState>) => {
          return { ...state, ...action.payload };
        }
    }
  })
  export const { setUpdateValues } = updateValuesSlice.actions;

  export default updateValuesSlice.reducer;