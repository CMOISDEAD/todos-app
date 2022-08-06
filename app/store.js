import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";
import configReducer from "./configSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    config: configReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
