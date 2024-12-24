import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginStore/loginStore";

const store = configureStore({
  reducer: {
    loginStore: loginReducer,
  },
});

export default store;
