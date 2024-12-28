import React from "react";
import CanvasWithImage from "./canvasimg";

import user from "@/assets/user.png";
import verifyCodePng from "@/assets/verifycode.png";
import passwordPng from "@/assets/password.png";

const SignInForm = ({
  formData,
  errors,
  verifyCode,
  handleChange,
  handleBlur,
  handleSubmit,
  havNewCode,
}) => {
  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <h2 className="form-title">登&nbsp;&nbsp;录</h2>

      <div className={`form-input ${errors.username ? "error" : ""}`}>
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

      <div className={`form-input ${errors.password ? "error" : ""}`}>
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

      <div
        className={`form-input code-box ${errors.verifyCode ? "error" : ""}`}
      >
        <i>
          <img src={verifyCodePng} alt="" />
        </i>
        <input
          maxLength={4}
          type="text"
          autoComplete="off"
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
  );
};

export default SignInForm;
