const router_module = {
  path: "/moduleMain",
  meta: {
    title: "学习管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  component: resolve =>
    require(["../views/studyManage/moduleMain.vue"], resolve),
  children: [
    {
      path: "/studyManage/studyRecord",
      meta: {
        title: "学习记录",
        show: true
      },
      component: resolve =>
        require(["../views/studyManage/studyRecord.vue"], resolve)
    },
    {
      path: "/studyManage/questionManage",
      meta: {
        title: "问答管理",
        show: true
      },
      component: resolve =>
        require(["../views/studyManage/questionManage.vue"], resolve)
    },
    {
      path: "/work",
      meta: {
        title: "作业管理",
        show: true
      },
      redirect: "/studyManage/workManage",
      component: resolve => require(["@/views/moduleMain.vue"], resolve),
      children: [
        {
          path: "/studyManage/workManage",
          meta: {
            show: true
          },
          component: resolve =>
            require(["../views/studyManage/workManage.vue"], resolve)
        },
        {
          path:
            "/studyManage/releteWork/:taskId/:courseId/:exerciseCount/:judgementCount/:singleCount/:multiCount",
          meta: {
            title: "关联习题",
            show: true
          },
          component: resolve =>
            require(["../views/studyManage/releteWork.vue"], resolve)
        }
      ]
    },
    {
      path: "/studyManage/signManage",
      meta: {
        title: "签到管理",
        show: true
      },
      component: resolve =>
        require(["../views/studyManage/signManage.vue"], resolve)
    },
    {
      path: "/studyManage/noteManage",
      meta: {
        title: "笔记管理",
        show: true
      },
      component: resolve =>
        require(["../views/studyManage/noteManage.vue"], resolve)
    }
  ]
};

export default router_module;
