const router_module = {
  path: "/moduleMain",
  meta: {
    title: "辅导管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  component: resolve =>
    require(["../views/guideManage/moduleMain.vue"], resolve),
  children: [
    {
      path: "/guideManage/liveType",
      meta: {
        title: "直播类别",
        show: true
      },
      component: resolve =>
        require(["../views/guideManage/liveType.vue"], resolve)
    },
    {
      path: "/liveList",
      meta: {
        title: "直播列表",
        show: true
      },
      redirect: "/guideManage/liveList",
      component: resolve => require(["@/views/moduleMain.vue"], resolve),
      children: [
        {
          path: "/guideManage/liveList",
          meta: {
            show: true
          },
          component: resolve =>
            require(["../views/guideManage/liveList.vue"], resolve)
        },
        {
          path: "/guideManage/videoNote/:title/:teacher/:course/:id",
          meta: {
            title: "直播日志",
            show: true
          },
          component: resolve =>
            require(["../views/guideManage/videoNote.vue"], resolve)
        }
      ]
    },
    {
      path: "/teacher",
      meta: {
        title: "教师列表",
        show: true
      },
      redirect: "/guideManage/teacherList",
      component: resolve => require(["@/views/moduleMain.vue"], resolve),
      children: [
        {
          path: "/guideManage/teacherList",
          meta: {
            show: true
          },
          component: resolve =>
            require(["../views/guideManage/teacherList.vue"], resolve)
        },
        {
          path: "/guideManage/distribution/:id/:type",
          meta: {
            title: "分配",
            show: true
          },
          component: resolve =>
            require(["../views/guideManage/distribution.vue"], resolve)
        }
      ]
    },
    {
      path: "/guideManage/guideStatistic",
      meta: {
        title: "辅导统计",
        show: true
      },
      component: resolve =>
        require(["../views/guideManage/guideStatistic.vue"], resolve)
    }
    // {
    //   path: "/guideManage/distribution",
    //   meta: {
    //     title: "教师列表-分配",
    //     show: true
    //   },
    //   component: resolve =>
    //     require(["../views/guideManage/distribution.vue"], resolve)
    // },
    // {
    //   path: "/guideManage/videoNote/:title/:teacher/:course/:id",
    //   meta: {
    //     title: "直播列表-直播日志",
    //     show: true
    //   },
    //   component: resolve =>
    //     require(["../views/guideManage/videoNote.vue"], resolve)
    // }
  ]
};

export default router_module;
