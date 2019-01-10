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

    get_courseWorkExerciseList: params => $.get("/teaching/work/workExercise/"+params, {})
};
