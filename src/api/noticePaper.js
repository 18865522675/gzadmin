import { $ } from "./axios";

export default {
	//	 通知书列表
  getNoticePaperList: params => $.get("/advice/note/list", params),
  
  sendNoticePaper: params => $.post("/advice/note/display", params),



};
