const router_module = {
  path: "/moduleMain",
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  meta: {
    title: "通知书管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  children: [
    {
      path: "/noticePaper/noticePaper",
      meta: {
        show: true,
        title: "通知书管理"
      },
      component: resolve => require(["@/views/noticePaper/noticePaper.vue"], resolve)
    }
  ]
};

export default router_module;
