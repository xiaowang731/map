import React from "react";
import log1 from "@/assets/log1.svg";
import log2 from "@/assets/log2.svg";

const Panels = ({ toSignUp, toSignIn }) => {
  return (
    <div className="panels-container">
      <div className="panel left-panel">
        <div className="panel-content">
          <h3>新来的?</h3>
          <p>
            In everyone's heart, this is a person who can not remember, but can
            not embrace and cherish
          </p>
          <button className="panel-btn" onClick={toSignUp}>
            注册
          </button>
        </div>
        <div className="panel-img">
          <img src={log1} />
        </div>
      </div>
      <div className="panel right-panel">
        <div className="panel-content">
          <h3>已有账号?</h3>
          <p>
            In everyone's heart, this is a person who can not remember, but can
            not embrace and cherish
          </p>
          <button className="panel-btn" onClick={toSignIn}>
            登录
          </button>
        </div>
        <div className="panel-img">
          <img src={log2} />
        </div>
      </div>
    </div>
  );
};

export default Panels;
