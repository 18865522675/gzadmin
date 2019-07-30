import { $ } from "./axios";

export default {
//考务
//考试学生
  getExamStudentList: params => $.get("/exam/sutdents/list", params),
  
  getExamStudentList_batchs: params => $.get("/exam/sutdents/listBatchs", params),
  
  getExamStudentList_courses: params => $.get("/exam/sutdents/listCourses", params),
  
  getExamStudentList_majors: params => $.get("/exam/sutdents/listMajors", params),
  
  
  //平时成绩
  getDailyScoreList: params => $.get("/exam/usualScore/list", params),
  
//考试成绩
   getExamScoreList: params => $.get("/exam/examlScore/list", params),
  
  
  
  //考试安排
  getExamArrangeList: params => $.get("/exam/exam/list", params),
  
  getExamArrangeList_majors: params => $.get("/exam/exam/listMajors", params),
  
  getExamArrangeList_courses: params => $.get("/exam/exam/listCourses", params),
  
  getExamArrangeList_students: (id,params) => $.get("/exam/exam/"+id+"/listStudent", params),
  
  addExamArrange: params => $.post("/exam/exam", params),
  
  editExamArrange: (id,params) => $.put("/exam/exam/"+id, params),
  
  
   
  //学生成绩	
  getStudentScoreList: params => $.get("/exam/studentScore/list", params),
  applyAction: params => $.post("/exam/studentScore/apply/"+params, {}),
	passAction: params => $.post("/exam/studentScore/passed/"+params, {}),
  refuseAction: params => $.post("/exam/studentScore/refuse/"+params, {}),
  
   getRelateStudents: (id,params) => $.get("/exam/exam/"+id+"/listStudent", params),
   
   saveRelateStudents: (id,params) => $.post("/exam/exam/"+id+"/addStudent",params),
   
   
     //在线成绩
  getOnlineScoreList: params => $.get("/exam/online/score/list", params),
};
