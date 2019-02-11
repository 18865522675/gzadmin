import { $ } from "./axios";

export default {

  //教学计划
  teachPlan_add: params => $.post("/teaching/plan", params, { lock: true }),
  get_TeachPlanDisciplineList: params => $.get("/teaching/plan/listDisciplines", params),
  get_TeachPlanMajorList: params => $.get("/teaching/plan/listMajors", params),
  get_TeachPlanList: params => $.get("/teaching/plan/list", params),
  teachPlan_edit: (id,params) => $.put("/teaching/plan/"+id, params, { lock: true }),
    get_TeachPlanCourses: params => $.get("/teaching/plan/listCourses", params),
//主题讨论

 discuss_add: params => $.post("/teaching/discuss", params, { lock: true }),
  get_discussList: params => $.get("/teaching/discuss/list", params),
  discuss_edit: (id,params) => $.put("/teaching/discuss/"+id, params, { lock: true }),
    get_discussTeachPlanList: params => $.get("/teaching/discuss/listCourses", params),
    get_discussContentList: params => $.get("/teaching/discuss/listContent", params),

    discuss_addContent: params => $.post("/teaching/discuss/saveContent", params, { lock: true }),
    discuss_editContent: (id,params) => $.post("/teaching/discuss/updateContent/"+id, params, { lock: true }),

    //获取专业列表
    teachPlanMajor_getList: params => $.get("/teaching/siteMajor/list", params, { lock: true }),


//  课程作业
		courseWork_add: params => $.post("/teaching/work", params, { lock: true }),
		courseWork_edit: (id,params) => $.put("/teaching/work/"+id, params, { lock: true }),
        get_courseWorkList: params => $.get("/teaching/work/list", params),
        get_courseWorkTeachPlanList: params => $.get("/teaching/discuss/listCourses", params),

    get_courseWorkExerciseList: params => $.get("/teaching/work/workExercise/"+params, {}),

    get_courseWorkExerciseListAll: params => $.get("/teaching/work/listExercises", params),

     courseWorkAddWork: (params) => $.post("/teaching/work/add", params, { lock: true }),
     
     
     
     // 学习记录
		studyRecordList: params => $.get("/teaching/record/list", params, { lock: true }),
		
		studyRecordList_stations: params => $.get("/teaching/record/listStations", params, { lock: true }),
		studyRecordList_majors: params => $.get("/teaching/record/listMajors", params, { lock: true }),
		studyRecordList_batchs: params => $.get("/teaching/record/list", params, { lock: true }),
		
		studyRecordList_getDetailTable: (id,params) => $.get("/teaching/record/details/"+id, params, { lock: true }),
		
		
		     // 作业评论
		studyWorkManagerList: params => $.get("/teaching/workManager/list", params, { lock: true }),
		
		studyWorkManagerList_stations: params => $.get("/teaching/workManager/listStations", params, { lock: true }),
		
		studyWorkManagerList_courses: params => $.get("/teaching/workManager/listCourses", params, { lock: true }),
		
		studyWorkManagerList_majors: params => $.get("/teaching/workManager/listMajors", params, { lock: true }),
		
		studyWorkManagerList_detail: (id,params) => $.get("/teaching/workManager/"+id+"/details", params, { lock: true }),
		
		
				     // 下载中心
		getDownload_list: params => $.get("/teaching/doc/list", params, { lock: true }),
		
		getDownload_add: params => $.post("/teaching/doc", params, { lock: true }),
		
		getDownload_edit: (id,params) => $.put("/teaching/doc/"+id, params, { lock: true }),
		
		
		 // 问答管理
		getQa_list: params => $.get("/teaching/qa/list", params, { lock: true }),
		
		getQa_stations: params => $.get("/teaching/qa/listStations", params, { lock: true }),
		
		getQa_majors: params => $.get("/teaching/qa/listMajors", params, { lock: true }),
		
		getQa_courses: params => $.get("/teaching/qa/listCourses", params, { lock: true }),
		
		qsAnswer: (id,params) => $.post("/teaching/qa/answer/"+id, params, { lock: true }),
		
		qsEdit: (id,params) => $.post("/teaching/qa/updateAnswer/"+id, params, { lock: true })
};
