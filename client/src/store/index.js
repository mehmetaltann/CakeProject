import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import generalSlice from "./slices/generalSlice";

export const store = configureStore({
  reducer: {
    general: generalSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(baseApi.middleware),
});
