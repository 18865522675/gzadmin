const router_module = {
  path: "/moduleMain",
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  meta: {
    title: "教务管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  children: [
      {
          path: "/teachManage/majorInfo",
          meta: {
              show: true,
              title: "专业信息"
          },
          component: resolve => require(["@/views/teachManage/majorInfo.vue"], resolve)
      },
    {
      path: "/teachManage/teachPlan",
      meta: {
        show: true,
        title: "教学计划"
      },
      component: resolve => require(["@/views/teachManage/teachPlan.vue"], resolve)
    },
    {
      path: "/teachManage/downloadCenter",
      meta: {
        show: true,
        title: "下载中心"
      },
      component: resolve => require(["@/views/teachManage/downloadCenter.vue"], resolve)
    },
    {
      path: "/teachManage/discuss",
      meta: {
        show: true,
        title: "主题讨论"
      },
      component: resolve => require(["@/views/teachManage/discuss.vue"], resolve)
    },
     {
      path: "/teachManage/courseWorks",
      meta: {
        show: true,
        title: "课程作业"
      },
      component: resolve => require(["@/views/teachManage/courseWorks.vue"], resolve)
    },
      {
          path: "/teachManage/courseWorkRelete/:workId/:workName",
          meta: {
              show: false,
              title: "课程作业-关联习题"
          },
          component: resolve => require(["@/views/teachManage/courseWorkRelete.vue"], resolve)
      },
    {
      path: "/teachManage/discusslook/:id/:name",
      meta: {
        show: false,
        title: "主题讨论-查看"
      },
      component: resolve => require(["@/views/teachManage/discusslook.vue"], resolve)
    }
  ]
};

export default router_module;
