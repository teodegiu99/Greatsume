"use client"

// import {configureStore} from "@reduxjs/toolkit"
// import updateValuesReducer from "./values/valuesSlice"

// export const store = configureStore({
//     reducer: {
//         updateValues: updateValuesReducer,
//     }
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import updateValuesReducer from "./values/valuesSlice";
import templateReducer from './values/templateSlice';
import  showHideReducer  from './values/showHideSlice';

// Combiniamo i reducer di tutti i slice
const rootReducer = combineReducers({
  updateValues: updateValuesReducer,
  template: templateReducer, // Aggiungi il nuovo slice qui
  showHide: showHideReducer,
});

// Creiamo lo store utilizzando il rootReducer
export const store = configureStore({
  reducer: rootReducer,
});

// Definiamo il tipo dello stato radice e il tipo della dispatch dell'app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;