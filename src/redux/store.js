import { configureStore } from '@reduxjs/toolkit'
import filterSlice from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
    },
})