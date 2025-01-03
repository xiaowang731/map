import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
// 引入组件
import { message } from "antd";
import Panels from "./Panels";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { haveUserInfo } from "@/store/loginStore/loginStore";
// 接口api
import { reqLogImg, reqLogin } from "@/api/login";
// 按钮防抖hooks
import useDebounce from "@/utils/usedebounce";

// Login组件
const Login = () => {
  // 引入仓库中的数据
  const { userInfo } = useSelector((state) => state.loginStore);
  // 导入钩子函数
  const dispatch = useDispatch();
  // canvas图片+秘钥
  const [verifyCode, setVerifyCode] = useState({ base64: "", uuid: "" });
  // 跳转组件
  const Navigate = useNavigate();
  // 登录表单收集的数据
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyCode: "",
  });
  // 错误信息数据
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    verifyCode: "",
  });
  // 控制页面显示内容
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  // 提示信息组件
  const [messageApi, contextHolder] = message.useMessage();

  // 获取验证码函数
  const hasVerifyCode = async () => {
    const result = await reqLogImg();
    setVerifyCode(result.data);
  };

  // 刷新验证码
  const havNewCode = useDebounce(() => hasVerifyCode(), 500);

  // 组件挂载完毕获取验证码
  useEffect(() => {
    hasVerifyCode();
  }, []);

  // 收集数据
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 收集修改过的数据信息
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // 自定义校验规则
  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${
        name === "username" ? "用户名" : name === "password" ? "密码" : "验证码"
      }不能为空`;
    }
    return "";
  };

  // 失去焦点方法
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // 登录提交事件按钮
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    if (isValid) {
      // 方法1
      // await LoginMethod();
      // 方法2
      const code = `${verifyCode.uuid}:${formData.verifyCode}`;
      const result = await dispatch(
        haveUserInfo({
          ...formData,
          code,
        })
      );
      if (result === "ok") {
        Navigate("/home");
        await messageApi.open({ type: "success", content: "登录成功" });
      } else {
        // 登录失败重新获取验证码
        havNewCode();
        // 弹出提示信息
        await messageApi.open({ type: "error", content: result });
      }
    }
  };

  // // 登录方法 方法1
  // const LoginMethod = async () => {
  //   const code = `${verifyCode.uuid}:${formData.verifyCode}`;
  //   const result = await reqLogin({
  //     ...formData,
  //     code,
  //   });
  //   // 登录成功
  //   if (result.code === 200) {
  //     localStorage.setItem("TOKEN", result.data.token);
  //   } else {
  //     // 登录失败重新获取验证码
  //     havNewCode();
  //     // 弹出提示信息
  //     messageApi.open({ type: "error", content: result.message });
  //   }
  // };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      {contextHolder}
      <Panels
        toSignUp={() => setIsSignUpMode(true)}
        toSignIn={() => setIsSignUpMode(false)}
      />
      <div className="forms-container">
        <div className="signin-signup">
          <SignInForm
            formData={formData}
            errors={errors}
            verifyCode={verifyCode}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            havNewCode={havNewCode}
          />
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
