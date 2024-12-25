import React, { useRef } from "react";
import "./login.scss";

import log1 from "@/assets/log1.svg";
import log2 from "@/assets/log2.svg";
import user from "@/assets/user.png";
import password from "@/assets/password.png";

const Login = () => {
  const container = useRef();
  const toSignUp = () => {
    container.current.classList.add("sign-up-mode");
  };
  const toSignIn = () => {
    container.current.classList.remove("sign-up-mode");
  };
  return (
    <div className="container" ref={container}>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="panel-content ">
            <h3>新来的?</h3>
            <p>
              In erveryone's heart, this is a person who can not remember,but
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
        <div className="panel  right-panel">
          <div className="panel-content ">
            <h3>已有账号?</h3>
            <p>
              In erveryone's heart, this is a person who can not remember,but
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
          <form action="#" className="sign-in-form">
            <h2 className="form-title">登录</h2>
            <div className="form-input">
              <i>
                <img src={user} />
              </i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="form-input">
              <i>
                <img src={password} />
              </i>
              <input type="text" placeholder="password" />
            </div>
            <input type="submit" className="form-btn" value={"登录"} />
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="form-title">注册</h2>
            <div className="form-input">
              <i>
                <img src={user} />
              </i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="form-input">
              <i>
                <img src={password} />
              </i>
              <input type="text" placeholder="password" />
            </div>
            <input type="submit" className="form-btn" value={"注册"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
