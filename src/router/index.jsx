import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import setting from "../setting";

const Login = lazy(() => import("@/views/login/login"));
const Home = lazy(() => import("@/views/home/home"));
const NotFound = lazy(() => import("@/views/NotFound/NotFound"));

const HasToken = () => {
  const userToken = localStorage.getItem("TOKEN");
  if (!userToken) {
    return <Navigate to="/login" />;
  } else {
    return null;
  }
};

const route = [
  {
    path: "/",
    element: (
      <>
        <HasToken /> {/* 鉴权检查应在最外层执行 */}
        <Suspense fallback={<div>Loading...</div>}>
          <Home /> 
        </Suspense>
      </>
    ),
    children: [
      {
        path: "home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "main",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
    ],
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
