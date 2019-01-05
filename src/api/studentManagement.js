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
	//	编辑考前学生
  studentPre_edit: (id,params) =>
    $.put("/notice/kind" + params.id, params, { lock: true }),
    //考钱学生补录
    studentPre_saveAppend: params =>
        $.post("/student/before/saveAppend", params, { lock: true }),
    //考钱学生转出
    studentPre_saveOut: params =>
        $.post("/student/before/saveOut", params, { lock: true }),

    //查看学生详情
    getStudentPreDetail: params => $.get("/student/before/details/"+params, params),
};
