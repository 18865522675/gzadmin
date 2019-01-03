import { $ } from "./axios";

export default {
  // 直播列表
  //直播类别列表
  getVideotTypeList: params => $.get("/tutor/liveVideoType/list", params),

  //添加直播类别
  AddVideoType: params => $.post("/tutor/liveVideoType", params),

  //修改直播类别
  editVideoType: (id, params) => $.put("/tutor/liveVideoType/" + id, params),

  // 辅导教师
  //辅导教师列表
  getTeacherList: params => $.get("/tutor/teacher/list", params),

  //添加教师
  addTeacher: params => $.post("/tutor/teacher", params, { lock: true }),

  //获取课程列表
  getCourseList: params => $.get("/tutor/teacher/courseList", params),

  //编辑教师
  editTeacher: (id, params) =>
    $.put("/tutor/teacher/" + id, params, { lock: true }),

  //重置教师
  resetTeacher: params =>
    $.put("/tutor/teacher/reset/" + params, {}, { lock: true }),

  //关联
  releteTeacher: params =>
    $.post("/tutor/teacher/relate", params, { lock: true }),

  //关联
  cancelReleteTeacher: params =>
    $.delete("/tutor/teacher/details/cancel", params, { lock: true }),

  //获取关联院校列表
  getReleteSites: params => $.get("/tutor/teacher/listSimpleSite", params),

  //获取关联机构列表
  getReleteStations: params =>
    $.get("/tutor/teacher/listSimpleStation", params),

  // 辅导教师分配获取所有学生
  getStudentList: params => $.get("/tutor/teacher/studentList", params),

  // 辅导教师查看获取分配自己的学生
  getSeeStudentList: (id, params) =>
    $.get("/tutor/teacher/details/" + id, params),

  // 直播列表
  //直播列表
  getVideoList: params => $.get("/tutor/liveVideo/list", params),

  //添加直播列表
  addVideo: params => $.post("/tutor/liveVideo", params, { lock: true }),

  //获取直播课程列表
  getVideoCourses: params => $.get("/tutor/liveVideo/courseList", params),

  //获取直播教师列表
  getVideoTeachers: params => $.get("/tutor/liveVideo/teacherList", params),

  //获取直播类别
  getVideoTypes: params => $.get("/tutor/liveVideo/typeList", params),

  //编辑直播列表
  editVideo: (id, params) =>
    $.put("/tutor/liveVideo/" + id, params, { lock: true }),

  // 直播留言
  //留言列表
  getComList: (id, params) =>
    $.get("/tutor/liveVideoComment/" + id + "/list", params),

  //查看留言
  seeCom: id => $.get("/tutor/liveVideoComment/" + id, {}),

  getStaticList: params => $.get("/tutor/tutorCount/list", params),

  getTutorStudent: params => $.get("/tutor/teacher/studentList", params)
};
