import { $ } from "./axios";

export default {
//		考前学生
  //	考前学生列表
  getStudentPreList: params => $.get("student/before/list", params),
  //	考前学生科类
  getStudentPreSimpleDisplines: params => $.get("student/before/listDisciplines", params),
   //	考前学生科类
  getStudentPreSimpleMajors: params => $.get("student/before/listMajors", params),
   //	考前学生函授站
  getStudentPreSimpleStations: params => $.get("student/before/listStations", params),
  
  //考钱学生添加
	studentPre_add: params =>
	$.post("/student/before", params, { lock: true }),
	
	//	编辑靠钱学生
  studentPre_edit: (id,params) =>
    $.put("/notice/kind" + params.id, params, { lock: true }),
};
