const router_module = {
  path: "/moduleMain",
  meta: {
    title: "系统管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  children: [
    {
      path: "/systemManagement/myMessage",
      meta: {
        title: "我的信息",
        show: true
      },
      component: resolve =>
        require(["../views/systemManagement/myMessage.vue"], resolve)
    },
    {
      path: "/systemManagement/learningSettings",
      meta: {
        title: "学习设置",
        show: true
      },
      component: resolve =>
        require(["../views/systemManagement/learningSettings.vue"], resolve)
    },
//  {
//    path: "/systemManagement/timeSetting",
//    meta: {
//      title: "时间设置",
//      show: true
//    },
//    component: resolve =>
//      require(["../views/systemManagement/timeSetting.vue"], resolve)
//  },
//  {
//    path: "/systemManagement/banner",
//    meta: {
//      title: "首页Banner",
//      show: true
//    },
//    component: resolve =>
//      require(["../views/systemManagement/banner.vue"], resolve)
//  },
    {
      path: "/systemManagement_roleManagement",
      meta: {
        title: "角色管理",
        show: true
      },
      redirect: "/systemManagement/roleManagement",
      component: resolve => require(["../views/moduleMain.vue"], resolve),
      children: [
        {
          path: "/systemManagement/roleManagement",
          meta: {
            show: false
          },
          component: resolve =>
            require(["../views/systemManagement/roleManagement.vue"], resolve)
        },
        {
          path: "/systemManagement/roleManagement_sys/:id/:name",
          meta: {
            title: "设置权限",
            show: false
          },
          component: resolve =>
            require([
              "../views/systemManagement/roleManagement_sys.vue"
            ], resolve)
        }
      ]
    },
    {
      path: "/systemManagement/administrators",
      meta: {
        title: "管理员",
        show: true
      },
      component: resolve =>
        require(["../views/systemManagement/administrators.vue"], resolve)
    },
 {
   path: "/systemManagement/moduleManagement",
   meta: {
     title: "模块管理",
     show: true
   },
   component: resolve =>
     require(["../views/systemManagement/moduleManagement.vue"], resolve)
 },
//  {
//    path: "/systemManagement/friendshipLink",
//    meta: {
//      title: "友情链接",
//      show: true
//    },
//    component: resolve =>
//      require(["../views/systemManagement/friendshipLink.vue"], resolve)
//  },
//  {
//    path: "/systemManagement/operationLog",
//    meta: {
//      title: "日志管理",
//      show: true
//    },
//    component: resolve =>
//      require(["../views/systemManagement/operationLog.vue"], resolve)
//  },
//  {
//    path: "/systemManagement/appVersion",
//    meta: {
//      title: "App版本更新",
//      show: true
//    },
//    component: resolve =>
//      require(["../views/systemManagement/appVersion.vue"], resolve)
//  }
  ]
};

export default router_module;
