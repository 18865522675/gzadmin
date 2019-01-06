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



    //	录取学生列表
    getStudentEnrollList: params => $.get("student/enrolled/list", params),
    //	录取学生科类
    getStudentEnrollSimpleDisplines: params => $.get("student/enrolled/listDisciplines", params),
    // 录取学生专业
    getStudentEnrollSimpleMajors: params => $.get("student/enrolled/listMajors", params),
    //	录取学生函授站
    getStudentEnrollSimpleStations: params => $.get("student/enrolled/listStations", params),

    //录取学生分配函授站
    studentEnroll_allot: params =>
        $.post("/student/enrolled/allotStation", params, { lock: true }),



    //	学生信息列表
    getStudentInfoList: params => $.get("student/normal/list", params),
    //	学生信息科类
    getStudentInfoSimpleDisplines: params => $.get("student/normal/listDisciplines", params),
    // 学生信息专业
    getStudentInfoSimpleMajors: params => $.get("student/normal/listMajors", params),
    //	学生信息函授站
    getStudentInfoSimpleStations: params => $.get("student/normal/listStations", params),

    //学生信息变更学籍
    studentInfo_allot: params =>
        $.post("/student/normal/changeSchoolRoll/"+params, {}, { lock: true }),

    //学生信息添加
    studentInfo_add: params =>
        $.post("/student/normal", params, { lock: true }),
    //	编辑学籍信息
    studentInfo_edit: (id,params) =>
        $.put("/student/normal" + id, params, { lock: true }),


    //	学籍异动列表
    getStudentTransList: params => $.get("student/transf/list", params),
    //	学籍异动科类
    getStudentTransSimpleDisplines: params => $.get("student/transf/listDisciplines", params),
    // 学籍异动专业
    getStudentTransSimpleMajors: params => $.get("student/transf/listMajors", params),
    //	学籍异动函授站
    getStudentTransSimpleStations: params => $.get("student/transf/listStations", params),


    //	奖惩管理列表
    getStudentrpList: params => $.get("student/rp/list", params),
    //	奖惩管理科类
    getStudentrpSimpleDisplines: params => $.get("student/transf/listDisciplines", params),
    // 奖惩管理专业
    getStudentrpSimpleMajors: params => $.get("student/transf/listMajors", params),
    //	奖惩管理函授站
    getStudentrpSimpleStations: params => $.get("student/transf/listStations", params),


    //奖惩管理添加
    studentrp_add: params =>
        $.post("/student/rp", params, { lock: true }),
    //	奖惩管理信息
    studentrp_edit: (id,params) =>
        $.put("/student/rp" + id, params, { lock: true }),
};
