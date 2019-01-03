import { $ } from "./axios";

let editPayment = (id, params) =>
    $.put("/payment/order/" + id, params, { lock: true });
export default {
  //      消息列表
  getPaymentList: params => $.get("/payment/order/list", params),

  //      发布
  getPaymentCourses: params =>
    $.get("/payment/order/listCourse", params, { lock: true }),

  //      学生列表
  getPaymentStations: params =>
    $.get("/payment/order/listSimpleStation", params),

  //      新增
  editPayment: (id, params) =>
    $.put("/payment/order/" + id, params, { lock: true })
};
