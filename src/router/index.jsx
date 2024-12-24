import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import setting from "../setting";

const Login = lazy(() => import("@/views/login/login"));
const Home = lazy(() => import("@/views/home/home"));
const NotFound = lazy(() => import("@/views/NotFound/NotFound"));

const HasToken = () => {
  const userToken = localStorage.getItem("TOKEN");
  // document.title = `${setting.title}-`
  if (!userToken) {
    return <Navigate to="/login" />;
  } else {
    return null;
  }
};

const route = [
  {
    path: "/",
    element: <Navigate to="home" />, // 重定向到 home
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "home",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        {HasToken()}
        <Home />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound></NotFound>
      </Suspense>
    ),
  },
];
const router = createBrowserRouter(route);
export default router;
