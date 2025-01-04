import React, { useState } from "react";
import { Link } from "react-router-dom"; // 用于路由跳转
import "./Home.scss"; // 样式文件
import LeftImg from "@/assets/zuo.svg";
import RightImg from "@/assets/you.svg";
import MoreImg from "@/assets/more.svg";
import JiaImg from "@/assets/jia.svg";
// 菜单数据
const menuData = [
  {
    title: "菜单项1",
    icon: "📁", // 一级菜单图标
    haveMore: "true",
    subMenu: [
      {
        title: "子菜单1",
        icon: "📂", // 二级菜单图标
        haveMore: "true",
        subMenu: [
          { title: "三级菜单1", to: "/", haveMore: "true" }, // 路由跳转
          { title: "三级菜单2", to: "/", haveMore: "true" },
        ],
      },
      {
        title: "子菜单2",
        haveMore: "true",
        icon: "📝", // 二级菜单图标
        subMenu: [
          { title: "三级菜单3", to: "/" },
          { title: "三级菜单4", to: "/" },
        ],
      },
    ],
  },
  {
    title: "菜单项2",
    icon: "🔧", // 一级菜单图标
    subMenu: [
      { title: "子菜单3", icon: "⚙️" },
      { title: "子菜单4", icon: "🔒" },
    ],
  },
  {
    title: "菜单项3",
    icon: "🎯", // 一级菜单图标
    subMenu: [{ title: "子菜单5", icon: "🏆" }],
  },
  {
    title: "菜单项4",
    icon: "⚡", // 一级菜单图标
  },
];

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 控制左侧导航的展开/折叠
  const [activeMenu, setActiveMenu] = useState(null); // 控制哪个菜单展开
  const [activeSubMenu, setActiveSubMenu] = useState(null); // 控制子菜单展开

  // 切换导航栏展开/折叠状态
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 控制下拉菜单的展开与折叠
  const toggleDropdown = (menuIndex) => {
    setActiveMenu(activeMenu === menuIndex ? null : menuIndex);
    setActiveSubMenu(null); // 收起其他层级的菜单
  };

  // 控制子菜单展开与折叠
  const toggleSubDropdown = (menuIndex) => {
    setActiveSubMenu(activeSubMenu === menuIndex ? null : menuIndex);
  };
  //新增
  const newlyAdd = (e, menu, index) => {
    e.stopPropagation();
    console.log(e, menu, index);
  };
  const renderSubMenu = (subMenu, parentIndex) => {
    return (
      <div className="dropdown-menu">
        {subMenu.map((item, index) => (
          <div key={`${parentIndex}-${index}`} className="submenu-item">
            <div
              className="submenu-title"
              onClick={() => toggleSubDropdown(`${parentIndex}-${index}`)}
            >
              <div>
                {item.icon && <span className="menu-icon">{item.icon}</span>}
                {item.title}
                {item.subMenu && (
                  <span
                    className={`arrow ${
                      activeSubMenu === `${parentIndex}-${index}` ? "open" : ""
                    }`}
                  ></span>
                )}
              </div>
              {item.haveMore && (
                <div className="menu-item-rightIcon">
                  <button>
                    <img src={JiaImg} alt="加" />
                  </button>
                  <button>
                    <img src={MoreImg} alt="更多" />
                  </button>
                </div>
              )}
            </div>
            {activeSubMenu === `${parentIndex}-${index}` && item.subMenu && (
              <div className="sub-submenu">
                {item.subMenu.map((subItem, subIndex) => (
                  <div
                    key={`${parentIndex}-${index}-${subIndex}`}
                    className="submenu-item-btn"
                  >
                    <Link to={subItem.to} className="submenu-link">
                      <div>
                        {subItem.icon && (
                          <span className="menu-icon">{subItem.icon}</span>
                        )}
                        {subItem.title}
                      </div>
                      {item.haveMore && (
                        <div className="menu-item-rightIcon">
                          <button>
                            <img src={MoreImg} alt="更多" />
                          </button>
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
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
            {menuData.map((menu, index) => (
              <div key={index} className="menu-item-box">
                <div
                  className="menu-item"
                  onClick={() => toggleDropdown(index)}
                >
                  <div>
                    {menu.icon && (
                      <span className="menu-icon">{menu.icon}</span>
                    )}
                    {menu.title}
                    <span
                      className={`arrow ${activeMenu === index ? "open" : ""}`}
                    ></span>
                  </div>
                  {menu.haveMore && (
                    <div className="menu-item-rightIcon">
                      <button>
                        <img
                          src={JiaImg}
                          alt="加"
                          onClick={(e) => {
                            newlyAdd(e, menu, index);
                          }}
                        />
                      </button>
                      <button>
                        <img src={MoreImg} alt="更多" />
                      </button>
                    </div>
                  )}
                </div>
                {activeMenu === index &&
                  menu.subMenu &&
                  renderSubMenu(menu.subMenu, index)}
              </div>
            ))}
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
