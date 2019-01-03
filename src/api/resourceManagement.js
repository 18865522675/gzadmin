import { $ } from "./axios";

export default {
  /*
  课程课件
   */
  courseCourseware_get_listCourse: params =>
    $.get("resource/ware/listCourse", params),
  courseCourseware_get_listVersion: params =>
    $.get("resource/ware/listVersion", params),
  courseCourseware_get_list: params => $.get("resource/ware/list", params),
  courseCourseware_add: params =>
    $.post("resource/ware", params, { lock: true }),
  courseCourseware_edit: params =>
    $.put("resource/ware/" + params.id, params, { lock: true }),
  courseCourseware_enable: params =>
    $.put("resource/ware/enable", params, { lock: true }),
  courseCourseware_disable: params =>
    $.put("resource/ware/disable", params, { lock: true }),

  /*
  课程习题
   */
  courseExercises_get_listCourse: params =>
    $.get("resource/exercise/listCourse", params),
  courseExercises_get_list: params => $.get("resource/exercise/list", params),
  courseExercises_add: params =>
    $.post("resource/exercise", params, { lock: true }),
  courseExercises_info: params =>
    $.get("resource/exercise/details/" + params.id, params, { lock: true }),
  courseExercises_edit: params =>
    $.put("resource/exercise/" + params.id, params, { lock: true }),

  /*
  课程管理
   */
  courseManagement_get_list: params => $.get("resource/course/list", params),
  courseManagement_add: params =>
    $.post("resource/course", params, { lock: true }),
  courseManagement_get_listVersion: params =>
    $.get("resource/course/listVersion", params),
  courseManagement_edit: params =>
    $.put("resource/course/" + params.id, params, { lock: true }),
  courseManagement_get_listWare: params =>
    $.get("resource/course/listWare", params),
  courseManagement_get_listExercise: params =>
    $.get("resource/course/listExercise", params),
    courseManagement_get_listBook: params =>
        $.get("resource/course/listBook", params),
  courseManagement_info: params =>
    $.get("resource/course/detailsExercise/" + params.id, params, {
      lock: true
    }),

  /*
  专业管理
   */
  professionalManagement_get_list: params =>
    $.get("resource/major/list", params),
  professionalManagement_get_listSimpleCourse: params =>
    $.get("resource/major/listSimpleCourse", params, { lock: true }),
  professionalManagement_add: params =>
    $.post("resource/major", params, { lock: true }),
  professionalManagement_edit: params =>
    $.put("resource/major/" + params.id, params, { lock: true }),
  professionalManagement_get_listCourse: params =>
    $.get("resource/major/listCourse", params),
  professionalManagement_get_listWare: params =>
    $.get("resource/major/listWare", params),
  professionalManagement_get_listExercise: params =>
    $.get("resource/major/listExercise", params),
  professionalManagement_info: params =>
    $.get("resource/major/detailsExercise/" + params.id, params, {
      lock: true
    }),

  /*
  院校管理
  */
  schoolManagement_get_list: params => $.get("resource/site/list", params),
  schoolManagement_get_stationList: params => $.get("resource/site/listAllStation", params),
   schoolManagement_saveStation: params =>
    $.put("/resource/site/add", params, { lock: true }),
  schoolManagement_add: params =>	
    $.post("resource/site", params, { lock: true }),
  schoolManagement_edit: params =>
    $.put("resource/site/" + params.id, params, { lock: true }),
    
    
    
   /*
  站点管理
  */
  StationManagement_get_list: params => $.get("resource/station/list", params),
  StationManagement_add: params =>
    $.post("resource/station", params, { lock: true }),
  StationManagement_edit: params =>
    $.put("resource/station/" + params.id, params, { lock: true })
};
