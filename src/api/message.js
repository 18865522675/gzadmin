import { $ } from "./axios";

export default {
	//	 公告类型
  //   公告类型列表
  getMessageTypeList: params => $.get("notice/kind/list", params),
	//添加公告类型
	messageType_add: params =>
	$.post("/notice/kind", params, { lock: true }),
//	编辑公告类型
  messageType_edit: (id,params) =>
    $.put("/notice/kind/" + id, params, { lock: true }),
    
    
  //公告列表
  getNoticeList: params => $.get("/notice/notice/list", params),
	//添加公告列表
	notice_add: params =>$.post("/notice/notice", params, { lock: true }),
	
//	发布消息
	notice_publish: params =>$.post("/notice/notice/publish/"+params, {}, { lock: true }),
//	编辑公告类型
  notice_edit: (id,params) =>
    $.put("/notice/notice/" + params.id, params, { lock: true }),
  
  //获取邮件列表公告类型
  getNoticeKindsList: params => $.get("/notice/notice/listKinds", params),
  //获取邮件列表函授站
  getNoticeStationsList: params => $.get("/notice/notice/listStations", params),
  
  
  
  	//	 站内信管理
  //   站内信列表
  getStationList: params => $.get("notice/msg/list", params),
    getZhanneixinStationList: params => $.get("notice/msg/listStations", params),
    getStudentList: params => $.get("notice/msg/listStudents", params),

    stationMsg_add: params =>
        $.post("/notice/msg", params, { lock: true }),

    stationMsg_eidt: (id,params) =>
        $.put("/notice/msg/"+id, params, { lock: true })


};
