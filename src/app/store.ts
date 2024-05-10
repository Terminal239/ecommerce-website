import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./features/appSlice";

export const store = configureStore({
  reducer: {
    state: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;