import { $ } from "./axios";

export default {
  /*
  专业管理
   */
  essentialInformation_get_list: params =>
    $.get("baseInfo/major/list", params),
  essentialInformation_get_listSimpleMajor: params =>
    $.get("basicinfo/major/listSimpleMajor", params, { lock: true }),
  essentialInformation_edit: (id,params) =>
    $.put("baseInfo/major/" + id, params, { lock: true }),
  essentialInformation_add: params => $.post("baseInfo/major", params),
  essentialInformation_get_listCourse: params =>
    $.get("basicinfo/major/listCourse", params),
  essentialInformation_get_listWare: params =>
    $.get("basicinfo/major/listWare", params),
  essentialInformation_get_listExercise: params =>
    $.get("basicinfo/major/listExercise", params),
  essentialInformation_info: params =>
    $.get("basicinfo/major/detailsExercise/" + params.id, params, {
      lock: true
    }),

  /*
  科类管理
  */
//courseManagement_get_list: params => $.get("baseInfo/discipline/list", params),
////courseManagement_get_listWare: params =>
////  $.get("basicinfo/course/listWare", params),
//courseManagement_get_listExercise: params =>
//  $.get("basicinfo/course/listExercise", params),
//courseManagement_info: params =>
//  $.get("basicinfo/course/detailsExercise/" + params.id, params, {
//    lock: true
//  }),

	subjectManagement_get_list: params =>
    $.get("baseInfo/discipline/list", params),
  subjectManagement_add: params =>
    $.post("baseInfo/discipline", params, { lock: true }),
  subjectManagement_edit: (id,params) =>
    $.put("baseInfo/discipline/" + id, params, { lock: true }),

  /*
  站点管理
  */
  organizationalManagement_get_list: params =>
    $.get("baseinfo/station/list", params),
  organizationalManagement_get_listAllStation: params =>
    $.get("baseinfo/station/listAllStation", params),
  organizationalManagement_relete: params =>
    $.post("baseinfo/station", params, { lock: true }),
  organizationalManagement_edit: params =>
    $.put("basicinfo/station/" + params.id, params, { lock: true }),
    
   
    
     /*
  年级管理
  */
  batch_get_list: params =>
    $.get("baseInfo/batch/list", params),
  batch_add: params =>
    $.post("/baseInfo/batch", params, { lock: true }),
  batch_edit: (id,params) =>
    $.put("/baseInfo/batch/" + id, params, { lock: true })
};
