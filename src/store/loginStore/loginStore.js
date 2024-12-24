import { createSlice } from "@reduxjs/toolkit";

const loginStore = createSlice({
  name: "loginStore",
  initialState: { count: 0 },
  reducers: {
    jia: (state) => {
      state.count += 1;
    },
    jian: (state) => {
      state.count -= 1;
    },
  },
});

export const { jia, jian } = loginStore.actions;
export default loginStore.reducer;
