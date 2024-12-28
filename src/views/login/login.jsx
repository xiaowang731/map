import React, { useEffect, useState } from "react";
import "./login.scss";
import { message } from "antd";
import Panels from "./Panels";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { reqLogImg, reqLogin } from "@/api/login";
import useDebounce from "@/utils/usedebounce";



const Login = () => {
  const [verifyCode, setVerifyCode] = useState({ base64: "", uuid: "" });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyCode: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    verifyCode: "",
  });
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const hasVerifyCode = async () => {
    const result = await reqLogImg();
    setVerifyCode(result.data);
  };

  const havNewCode = useDebounce(() => hasVerifyCode(), 500);

  useEffect(() => {
    hasVerifyCode();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${
        name === "username" ? "用户名" : name === "password" ? "密码" : "验证码"
      }不能为空`;
    }
    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

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
      await LoginMethod();
    }
  };

  const LoginMethod = async () => {
    const code = `${verifyCode.uuid}:${formData.verifyCode}`;
    const result = await reqLogin({
      ...formData,
      code,
    });
    havNewCode();

    if (result.code === 200) {
      messageApi.open({ type: "success", content: "登录成功" });
    } else {
      messageApi.open({ type: "error", content: result.message });
    }
  };

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
