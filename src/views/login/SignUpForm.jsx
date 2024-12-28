import React from "react";
import user from "@/assets/user.png";
import verifyCodePng from "@/assets/verifycode.png";

const SignUpForm = () => {
  return (
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
          <img src={verifyCodePng} alt="" />
        </i>
        <input type="text" placeholder="Password" />
      </div>
      <input type="submit" className="form-btn" value="注册" />
    </form>
  );
};

export default SignUpForm;
