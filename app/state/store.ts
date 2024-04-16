"use client"

import {configureStore} from "@reduxjs/toolkit"
import updateValuesReducer from "./values/valuesSlice"

export const store = configureStore({
    reducer: {
        updateValues: updateValuesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;