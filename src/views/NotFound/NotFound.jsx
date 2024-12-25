import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">哎呀！你访问的页面不存在。</p>
        <p className="not-found-description">
          可能页面已被删除，或者你输入的地址有误。
        </p>
        <Link to="/" className="go-home-link">
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
