import { configureStore } from "@reduxjs/toolkit";
import tradeReducer from "../features/slice";

const store=configureStore({
    reducer: tradeReducer,
})

export default store;