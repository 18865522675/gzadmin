const router_module = {
  path: "/moduleMain",
  meta: {
    title: "首页",
    show: true, // 是否显示
    listHide: false, // 是否子菜单
    path: "/home"
  },
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  children: [
    {
      path: "/home",
      component: resolve => require(["@/views/home/home.vue"], resolve),
      meta: {
        show: false
      }
    },
    {
      path: "/home/resourceManagement_look/:courseId/:courseName/:wareVer",
      meta: {
        title: "课件、习题列表",
        show: false
      },
      component: resolve =>
        require([
          "../views/resourceManagement/courseManagement_look.vue"
        ], resolve)
    },
    {
      path: "/home/essentialInformation_look/:courseId/:courseName/:wareVer",
      meta: {
        title: "课件、习题列表",
        show: false
      },
      component: resolve =>
        require([
          "../views/resourceManagement/courseManagement_look.vue"
        ], resolve)
    }
  ]
};

export default router_module;
