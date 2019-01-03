import { $ } from "./axios";

export default {
  //      首页列表
  getHomeList: params => $.get("/Hide/mainPage", params)
};
