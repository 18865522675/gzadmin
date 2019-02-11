import { $ } from "./axios";

export default {
  /*
  我的信息
   */
  myMessage_get_info: params => $.get("system/myInfo", params, { lock: true }),
  myMessage_edit_info: params => $.put("system/myInfo", params, { lock: true }),

  /*
  学习设置
   */
  learningSettings_get_info: params =>
    $.get("system/scoreSetup/see", params, { lock: true }),
  learningSettings_save: params =>
    $.post("/system/scoreSetup/save", params, { lock: true }),

  /*
  学习设置
  */
  timeSetting_get_info: params =>
    $.get("system/timeSetting", params, { lock: true }),
  timeSetting_save: params =>
    $.put("system/timeSetting", params, { lock: true }),
  timeSetting_assessment: params =>
    $.put("system/timeSetting/assessment", params, {
      lock: true
    }),

  /*
  banner
   */
  banner_get_list: params => $.get("system/banner/list", params),
  banner_add: params => $.post("system/banner", params),
  banner_edit: params => $.put("system/banner/" + params.id, params),

  /*
  角色管理
  */
  roleManagement_get_list: params => $.get("system/role/list", params),
  roleManagement_get_siteList: params =>
    $.get("system/role/listSimpleSite", params, { lock: true }),
  roleManagement_get_stationList: params =>
    $.get("system/role/listSimpleStation", params, { lock: true }),
  roleManagement_add: params => $.post("system/role", params, { lock: true }),
  roleManagement_edit: params =>
    $.put("system/role/" + params.id, params, { lock: true }),
  roleManagement_get_manage: params =>
    $.get("system/role/manage/" + params.id, params, { lock: true }),
  roleManagement_save: params =>
    $.put("system/role/updatePermission/" + params.id, params, { lock: true }),

  /*
  管理员
  */
  administrators_get_list: params => $.get("system/admin/list", params),
  administrators_get_role_list: params =>
    $.get("system/admin/listRoles", params, { lock: true }),
  administrators_get_role_add: params =>
    $.post("system/admin", params, { lock: true }),
  administrators_get_role_edit: params =>
    $.put("system/admin/" + params.id, params, { lock: true }),
  administrators_get_role_reset: params =>
    $.put("system/admin/reset/" + params.id, params, { lock: true }),

  /*
  模块管理
  */
  moduleManagement_get_list: params => $.get("system/permission/list", params),
  moduleManagement_add: params =>
    $.post("system/permission", params, { lock: true }),
  moduleManagement_edit: params =>
    $.put("system/permission/" + params.id, params, { lock: true }),

  /*
  友情链接
  */
  friendshipLink_get_list: params => $.get("system/link/list", params),
  friendshipLink_add: params => $.post("system/link", params, { lock: true }),
  friendshipLink_edit: params =>
    $.put("system/link/" + params.id, params, { lock: true }),

  /*
  日志管理
  */
  operationLog_get_list: params => $.get("system/operateLog/list", params),
  operationLog_get_admin: params =>
    $.get("system/operateLog/listAdmin", params),

  /*
  App版本更新
  */
  appVersion_get_list: params => $.get("system/appVersion/list", params),
  appVersion_add: params => $.post("system/appVersion", params),
  appVersion_edit: params => $.put("system/appVersion/" + params.id, params),
  
//获取学校
   get_schoolList: params => $.get("/Hide/listMajors", params),
};
