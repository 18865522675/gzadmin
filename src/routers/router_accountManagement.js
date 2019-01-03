const router_module = {
  path: "/moduleMain",
  meta: {
    title: "账号管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  children: [
    {
      path: "/accountManagement/account_list",
      meta: {
        title: "账号列表",
        show: true
      },
      component: resolve =>
        require(["../views/accountManagement/account_list.vue"], resolve)
    },
    {
      path: "/accountManagement/account_appealList",
      meta: {
        title: "账号申述",
        show: true
      },
      component: resolve =>
        require(["../views/accountManagement/account_appealList.vue"], resolve)
    }
  ]
};

export default router_module;
