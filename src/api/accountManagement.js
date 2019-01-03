import { $ } from "./axios";

export default {
  /*
  账号列表
  */
  account_get_list: params => $.get("account/account/list", params),
  account_add: params => $.post("account/account", params, { lock: true }),
  account_edit: params =>
    $.put("account/account/" + params.id, params, { lock: true }),
  account_reset: params =>
    $.put("account/account/reset/" + params.id, params, { lock: true }),

  /*
  账号申诉
  */
  account_appealList: params => $.get("account/changePhone/list", params),
  account_appealPass: params => $.put("account/changePhone/pass/" + params),
  account_appealDeny: params => $.put("account/changePhone/deny/" + params),
  account_appealSee: params => $.get("account/changePhone/see/" + params)
};
