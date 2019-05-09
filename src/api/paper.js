import { $ } from "./axios";

export default {
//	获取简单信息
  //
  getPaperTopic_simpleBatch: params => $.get("/thesis/topic/listBatchs", params),	
  
  getPaperTopic_simpleMajor: params => $.get("/thesis/topic/listMajors", params),	
    
//getPaperTopic_simpleBatch: params => $.get("/thesis/topic/listBatchs", params),	
  //      获取选题列表
  getPaperTopicList: params => $.get("/thesis/topic/list", params),
// 导师添加
  teacher_add: params => $.post("/thesis/topic", params),
  
  teacher_edit: (params) => $.put("/thesis/topic/"+params.id, params),
  
  getTeacherTopicList: params => $.get("/thesis/topic/listTopic/"+params.teacherId, params),
  
  teacherTopic_add: params => $.post("/thesis/topic/saveTopic", params),
  
  
  
  //设计申请
 
  getPaperApply_simpleBatch: params => $.get("/thesis/applies/listBatchs", params),	
  
  getPaperApply_simpleMajor: params => $.get("/thesis/applies/listMajors", params),
  
  getPaperApply_simpleStation: params => $.get("/thesis/applies/listStations", params),

  getPaperApplyList: params => $.get("/thesis/applies/list", params),
  
  applyPass: (id,params) => $.post("/thesis/applies/pass/"+id, params),
  
  applyRefuse: (id,params) => $.post("/thesis/applies/refuse/"+id, params),
  
  
    //选题审核
 
  getPaperAudit_simpleBatch: params => $.get("/thesis/topic/choose/listBatchs", params),	
  
  getPaperAudit_simpleMajor: params => $.get("/thesis/topic/choose/listMajors", params),

  getPaperAudit_simpleTeacher: params => $.get("/thesis/topic/choose/listTeachers", params),
  
  getPaperAudit_simpleStation: params => $.get("/thesis/topic/choose/listStations", params),

  getPaperAuditList: params => $.get("/thesis/topic/choose/list", params),
  
  AuditApplyPass: (id,params) => $.post("/thesis/topic/choose/pass/"+id, params),
  
  AuditApplyRefuse: (id,params) => $.post("/thesis/topic/choose/refuse/"+id, params),
  
  
      //开题审核
 
  getPaperOpen_simpleBatch: params => $.get("/thesis/topic/start/listBatchs", params),	
  
  getPaperOpen_simpleMajor: params => $.get("/thesis/topic/start/listMajors", params),

  getPaperOpen_simpleTeacher: params => $.get("/thesis/topic/start/listTeachers", params),
  
  getPaperOpen_simpleStation: params => $.get("/thesis/topic/start/listStations", params),

  getPaperOpenList: params => $.get("/thesis/topic/start/list", params),
  
  OpenApplyPass: (id,params) => $.post("/thesis/topic/start/pass/"+id, params),
  
  OpenApplyRefuse: (id,params) => $.post("/thesis/topic/start/refuse/"+id, params),
  
  
        //论文审核
 
  getPaperLunwen_simpleBatch: params => $.get("/thesis/audit/listBatchs", params),	
  
  getPaperLunwen_simpleMajor: params => $.get("/thesis/audit/listMajors", params),

  getPaperLunwen_simpleTeacher: params => $.get("/thesis/audit/listTeachers", params),
  
  getPaperLunwen_simpleStation: params => $.get("/thesis/audit/listStations", params),

  getPaperLunwenList: params => $.get("/thesis/audit/list", params),
  
  LunwenApplyPass: (id,params) => $.post("/thesis/audit/pass/"+id, params),
  
  LunwenApplyRefuse: (id,params) => $.post("/thesis/audit/refuse/"+id, params),
  
  
          //答辩申请
 
  getPaperDefence_simpleBatch: params => $.get("/thesis/reply/audit/listBatchs", params),	
  
  getPaperDefence_simpleMajor: params => $.get("/thesis/reply/audit/listMajors", params),

  getPaperDefence_simpleTeacher: params => $.get("/thesis/reply/audit/listTeachers", params),
  
  getPaperDefence_simpleStation: params => $.get("/thesis/reply/audit/listStations", params),

  getPaperDefenceList: params => $.get("/thesis/reply/audit/list", params),
  
  DefenceApplyPass: (id,params) => $.post("/thesis/reply/audit/pass/"+id, params),
  
  DefenceApplyRefuse: (id,params) => $.post("/thesis/reply/audit/refuse/"+id, params),
  
  
   //答辩成绩
 
  getPaperScore_simpleBatch: params => $.get("/thesis/reply/score/listBatchs", params),	
  
  getPaperScore_simpleMajor: params => $.get("/thesis/reply/score/listMajors", params),

  getPaperScore_simpleTeacher: params => $.get("/thesis/reply/score/listTeachers", params),
  
  getPaperScore_simpleStation: params => $.get("/thesis/reply/score/listStations", params),

  getPaperScoreList: params => $.get("/thesis/reply/score/list", params),
  
  ScoreApplyPass: (params) => $.post("/thesis/reply/score/sitePass", params),
  
  ScoreApplyRefuse: (params) => $.post("/thesis/reply/score/siteRefuse", params),
  
  muliApply: params => $.post("/thesis/reply/score/apply", params),
  
  
  editScore: params => $.put("/thesis/reply/score/update/"+params.id, params),
  
  
  
  
  
  
//          //申请学位
 
  getPaperPosition_simpleBatch: params => $.get("/thesis/degree/listBatchs", params),	
  
  getPaperPosition_simpleMajor: params => $.get("/thesis/degree/listMajors", params),

  getPaperPosition_simpleTeacher: params => $.get("/thesis/degree/listTeachers", params),
  
  getPaperPosition_simpleStation: params => $.get("/thesis/degree/listStations", params),

  getPaperPositionList: params => $.get("/thesis/degree/list", params),
  
  PositionApplyPass: (id,params) => $.post("/thesis/degree/pass/"+id, params),
  
  PositionApplyRefuse: (id,params) => $.post("/thesis/degree/refuse/"+id, params),
  
  PositionApplyRefuse: (id,params) => $.post("/thesis/degree/refuse/"+id, params),
  
  
  
  
  
  //          //答辩安排
 
  getDefenceArrange_simpleBatch: params => $.get("/thesis/reply/listBatchs", params),	
  
  getDefenceArrange_simpleDiscipline: params => $.get("/thesis/reply/listDisciplines", params),

  getDefenceArrange_simpleMajors: params => $.get("/thesis/reply/listMajors", params),	
   
  getDefenceArrange_simpleTeachers: params => $.get("/thesis/reply/listTeachers", params),
  
  getDefenceArrangeList: params => $.get("/thesis/reply/list", params),
  
  addDefenceArrange: params => $.post("/thesis/reply/save", params),
  
  getDefenceArrangeSeeList: params => $.get("/thesis/reply/listForAllot", params),
  
  saveDefenceArrangeStudent: (id,params) => $.post("/thesis/reply/allot/"+id, params),
  
 	schoolPass: params => $.post("/thesis/reply/score/sitePass", params),
 	
 	schoolRefuse: params => $.post("/thesis/reply/score/siteRefuse", params),

  
  
  
};
