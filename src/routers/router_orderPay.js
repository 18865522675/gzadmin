const router_module = {
  path: "/moduleMain",
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  meta: {
    title: "订单缴费",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  children: [
    {
      path: "/orderPay/multiPay",
      meta: {
        show: true,
        title: "批量缴费"
      },
      component: resolve => require(["@/views/orderPay/multiPay.vue"], resolve)
    },
    {
      path: "/orderPay/orderManage",
      meta: {
        show: true,
        title: "订单管理"
      },
      component: resolve =>
        require(["@/views/orderPay/orderManage.vue"], resolve)
    }
  ]
};

export default router_module;
