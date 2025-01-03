import { createSlice } from "@reduxjs/toolkit";
import { reqLogin } from "@/api/login";

const loginStore = createSlice({
  name: "loginStore",
  initialState: {
    userInfo: {
      TOKEN: localStorage.getItem("TOKEN") || "",
    },
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
      console.log(state, action);
    },
  },
});

// 异步请求 传入用户名+密码+秘钥
export const haveUserInfo = (data) => {
  return async (dispatch) => {
    const result = await reqLogin(data);
    dispatch(setUserInfo(result.data));
    if (result.code === 200) {
      localStorage.setItem("TOKEN", result.data.token);
      return "ok";
    } else {
      return result.message;
    }
  };
};

export const { setUserInfo } = loginStore.actions;
export default loginStore.reducer;
