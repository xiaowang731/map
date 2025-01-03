import { createRoot } from "react-dom/client";
// 重置样式插件
import "normalize.css";
import App from "./App.jsx";
import store from "./store/index.js";
import { Provider } from "react-redux";
// 全局样式
import "./reset.scss";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App></App>
  </Provider>
);
