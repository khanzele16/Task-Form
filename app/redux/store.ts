import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    task: taskSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
