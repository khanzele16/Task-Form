"use client";
import { Provider } from "react-redux";
import Main from "./Main";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <Provider store={store}>
      <Main />
      <Toaster position="top-right" reverseOrder={true} />
    </Provider>
  );
}
