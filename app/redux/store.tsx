import { configureStore } from "@reduxjs/toolkit";
import cryptoSwapSlice from "./slices/cryptoSwapSlice";

const store = configureStore({
  reducer: {
    cryptoSwapSlice: cryptoSwapSlice,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
export default store;
