import request from "./index";

export const reqLogImg = () => {
  return request.get("/v1/code-img/");
};
