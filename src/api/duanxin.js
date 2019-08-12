import { $ } from "./axios";

export default {
  //      批量缴费列表
  getDuanxinList: params => $.get("/outside/note/list", params),

  //      批量缴费高校
  addDuanxin: params => $.post("/outside/note", params),
  
  editDuanxin: (id,params) => $.post("/outside/note/update/"+id, params),

  //      批量缴费机构
  getMudtipayStations: params =>
    $.get("/order/payment/listSimpleStation", params),

  //      批量缴费新增
  addMultipay: params => $.post("/order/payment", params),

  //      批量缴费编辑
  editMultipay: (id, params) =>
    $.put("/order/payment/" + id, params, { lock: true }),

  //      订单管理列表
  getOrderList: params => $.get("/order/order/list", params),

  //      名单管理高校
  getOrderSites: params => $.get("/order/payment/listSimpleSite", params),

  //      订单管理机构
  getOrderStations: params => $.get("/order/order/listSimpleStation", params),

  //      订单管理编辑
  editOrder: (id, params) =>
    $.put("/order/order/" + id, params, { lock: true }),

  //      根据证件类型，证件号获取缴费信息
  searchMultiInfo: params => $.get("/order/payment/paymentInfo", params)
};
