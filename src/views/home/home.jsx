import React, { useState } from "react";
import "./Home.scss"; // 样式文件
import LeftImg from "@/assets/zuo.svg";
import RightImg from "@/assets/you.svg";
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 控制左侧导航的展开/折叠

  // 切换导航栏展开/折叠状态
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home-container">
      <div
        className={`sidebar ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="sidebar-box">
          {/* 左侧导航区域 */}
          <div className="sidebar-header">DevCraft</div>
          <div className="sidebar-content">
            <div className="menu-item">菜单项1</div>
            <div className="menu-item">菜单项2</div>
            <div className="menu-item">菜单项3</div>
          </div>
        </div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? <img src={LeftImg} /> : <img src={RightImg} />}
        </button>
      </div>
      <div className="content-area">
        {/* 右侧内容区域 */}
        <div className="content">内容区域</div>
      </div>
    </div>
  );
};

export default Home;
