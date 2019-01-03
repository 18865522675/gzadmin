const router_module = {
  path: "/moduleMain",
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  meta: {
    title: "缴费管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  children: [
    {
      path: "/payment/payments",
      meta: {
        show: true,
        title: "缴费记录"
      },
      component: resolve => require(["@/views/payment/payment.vue"], resolve)
    }
  ]
};

export default router_module;
