import { $ } from "./axios";

export default {
  // 问答管理
  //问答列表
  getQuesList: params => $.get("/study/studentQuiz/list", params),

  //问答管理课程
  getQuesCourses: params => $.get("/study/studentQuiz/listCourse", params),

  //问答主考院校列表
  getQuesSites: params => $.get("/study/studentQuiz/listSimpleSite", params),

  //问答机构列表
  getQuesStations: params =>
    $.get("/study/studentQuiz/listSimpleStation", params),

  //编辑问答
  editQues: (id, params) =>
    $.put("/study/studentQuiz/" + id, params, { lock: true }),

  //问答机构列表
  seeQuesDetail: params => $.get("/study/studentQuiz/details/" + params, {}),

  // 作业管理
  //作业列表
  getWorkList: params => $.get("/study/task/list", params),

  //作业管理课程
  getWorkCourses: params => $.get("/study/task/listCourse", params),

  //添加作业
  addWork: params => $.post("/study/task", params, { lock: true }),

  //编辑作业
  editWork: (id, params) => $.put("/study/task/" + id, params, { lock: true }),

  //作业列表
  getWorkExercises: params => $.get("/study/task/listSelected", params),

  //过去课程关联的全部习题
  getCourseAllExercises: params => $.get("/study/task/listAll", params),

  //随机抽提
  listRandom: params => $.get("/study/task/listRandom", params),

  //随机抽提
  generatePaper: params => $.post("/study/task/generate", params),

  // 签到管理管理
  //签到列表
  getSignList: params => $.get("/study/studentSign/list", params),

  //签到管理大学
  getSignSites: params => $.get("/study/studentSign/listSimpleSite", params),

  //签到管理机构
  getSignStations: params =>
    $.get("/study/studentSign/listSimpleStation", params),

  // 笔记管理
  //笔记管理列表
  getNoteList: params => $.get("/study/studentNote/list", params),

  //笔记管理课程
  getNoteCourses: params => $.get("/study/studentNote/listCourse", params),

  //笔记管理院校
  getNoteSites: params => $.get("/study/studentNote/listSimpleSite", params),
  //笔记管理机构
  getNoteStations: params =>
    $.get("/study/studentNote/listSimpleStation", params),

  //显示隐藏
  changeNoteStatus: params =>
    $.put("/study/studentNote/" + params, {}, { lock: true }),

  seeNote: id => $.get("/study/studentNote/details/" + id, {}),
  getRecordList: params => $.get("/study/studentRecord/list", params),
  getRecordCourses: params => $.get("/study/studentRecord/listCourse", params),
  getRecordSites: params =>
    $.get("/study/studentRecord/listSimpleSite", params),
  getRecordStations: params =>
    $.get("/study/studentRecord/listSimpleStation", params)
};
