import { useEffect, useRef, useState } from "react";
import "./login.scss";

// 静态资源
import log1 from "@/assets/log1.svg";
import log2 from "@/assets/log2.svg";
import user from "@/assets/user.png";
import verifyCodePng from "@/assets/verifycode.png";
import passwordPng from "@/assets/password.png";

// 验证码组件
import CanvasWithImage from "./canvasimg";
// 接口函数
import { reqLogImg } from "@/api/login";
// 防抖自定义hooks
import useDebounce from "@/utils/usedebounce";
import { reqLogin } from "@/api/login";

const Login = () => {
  // 存储验证码
  const [verifyCode, setVerifyCode] = useState({
    base64: "",
    uuid: "",
  });

  // 存储表单数据和错误信息
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

  // 获取组件实例
  const container = useRef();

  // 方法
  const toSignUp = () => {
    container.current.classList.add("sign-up-mode");
  };

  const toSignIn = () => {
    container.current.classList.remove("sign-up-mode");
  };

  // 获取图形验证码函数
  const hasVerifyCode = async () => {
    const result = await reqLogImg();
    setVerifyCode(result.data);
  };

  // 重新获取code
  const havNewCode = useDebounce(() => {
    hasVerifyCode();
  }, 500);

  // 组件挂载执行
  useEffect(() => {
    hasVerifyCode();
  }, []);

  // 处理表单输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(), // 去除前后空格
    });
  };

  // 处理失去焦点时的验证
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${
          name === "username"
            ? "用户名"
            : name === "password"
            ? "密码"
            : "验证码"
        }不能为空`,
      }));
      // 触发闪烁效果
      const inputBox = e.target.closest(".form-input");
      inputBox.classList.add("error");
      setTimeout(() => {
        inputBox.classList.remove("error");
      }, 500); // 闪烁时间
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // 表单提交验证
  const handleSubmit = (e) => {
    e.preventDefault();

    // 判断每个字段是否有效
    let valid = true;
    const newErrors = {};

    // 验证每个字段
    const fields = [
      { name: "username", label: "用户名" },
      { name: "password", label: "密码" },
      { name: "verifyCode", label: "验证码" },
    ];

    fields.forEach((field) => {
      if (!formData[field.name]) {
        newErrors[field.name] = `${field.label}不能为空`;
        valid = false;
        // 闪烁提示
        const inputBox = document
          .querySelector(`[name="${field.name}"]`)
          .closest(".form-input");
        inputBox.classList.add("error");
        setTimeout(() => inputBox.classList.remove("error"), 500);
      }
    });

    setErrors(newErrors);

    if (valid) {
      LoginMethod();
      // 执行登录操作
      // console.log("表单提交:", formData);
    }
  };
  // 登录方法
  const LoginMethod = async () => {
    const code = verifyCode.uuid + ":" + formData.verifyCode;

    const result = await reqLogin({
      ...formData,
      code,
    });
    havNewCode();
    if (result.code == 200) {
      alert("登录成功");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="container" ref={container}>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="panel-content ">
            <h3>新来的?</h3>
            <p>
              In everyone's heart, this is a person who can not remember, but
              can not embrace and cherish
            </p>
            <button className="panel-btn" onClick={toSignUp}>
              注册
            </button>
          </div>
          <div className="panel-img">
            <img src={log1} alt="" />
          </div>
        </div>
        <div className="panel right-panel">
          <div className="panel-content ">
            <h3>已有账号?</h3>
            <p>
              In everyone's heart, this is a person who can not remember, but
              can not embrace and cherish
            </p>
            <button className="panel-btn" onClick={toSignIn}>
              登录
            </button>
          </div>
          <div className="panel-img">
            <img src={log2} alt="" />
          </div>
        </div>
      </div>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="form-title">登&nbsp;&nbsp;录</h2>
            <div className="form-input">
              <i>
                <img src={user} alt="" />
              </i>
              <input
                maxLength={18}
                autoComplete="off"
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && (
                <span className="error-msg">{errors.username}</span>
              )}
            </div>
            <div className="form-input">
              <i>
                <img src={passwordPng} alt="" />
              </i>
              <input
                maxLength={18}
                type="password"
                placeholder="Password"
                autoComplete="off"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <span className="error-msg">{errors.password}</span>
              )}
            </div>
            <div className="form-input code-box">
              <i>
                <img src={verifyCodePng} alt="" />
              </i>
              <input
                maxLength={4}
                type="text"
                placeholder="VerifyCode"
                name="verifyCode"
                value={formData.verifyCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.verifyCode && (
                <span className="error-msg">{errors.verifyCode}</span>
              )}
              <div className="canvas-box" onClick={havNewCode}>
                <CanvasWithImage base64Image={verifyCode.base64} />
              </div>
            </div>
            <input type="submit" className="form-btn" value="登录" />
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="form-title">注册</h2>
            <div className="form-input">
              <i>
                <img src={user} alt="" />
              </i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="form-input">
              <i>
                <img src={passwordPng} alt="" />
              </i>
              <input type="text" placeholder="Password" />
            </div>
            <input type="submit" className="form-btn" value="注册" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
