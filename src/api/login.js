import request from "./index";

export const reqLogImg = () => {
  return request.get("/v1/code-img/");
};

export const reqLogin = (params) => {
  return request.post("/api/v1/login", params);
};
