const router_module = {
  path: "/moduleMain",
  meta: {
    title: "资源管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  children: [
    {
      path: "/resourceManagement/courseCourseware",
      meta: {
        title: "课程课件",
        show: true
      },
      component: resolve =>
        require(["../views/resourceManagement/courseCourseware.vue"], resolve)
    },
    {
      path: "/resourceManagement/courseExercises",
      meta: {
        title: "课程习题",
        show: true
      },
      component: resolve =>
        require(["../views/resourceManagement/courseExercises.vue"], resolve)
    },
    {
      path: "/resourceManagement_courseManagemen",
      meta: {
        title: "课程管理",
        show: true
      },
      redirect: "/resourceManagement/courseManagement",
      component: resolve => require(["../views/moduleMain.vue"], resolve),
      children: [
        {
          path: "/resourceManagement/courseManagement",
          meta: {
            show: false,
            title: "课程管理",
          },
          component: resolve =>
            require([
              "../views/resourceManagement/courseManagement.vue"
            ], resolve)
        },
        {
          path:
            "/resourceManagement/courseManagement_look/:courseId/:courseName/:wareVer",
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
    },
    // {
    //   path: "/resourceManagement_professionalManagement",
    //   meta: {
    //     title: "专业管理",
    //     show: true
    //   },
    //   redirect: "/resourceManagement/professionalManagement",
    //   component: resolve => require(["../views/moduleMain.vue"], resolve),
    //   children: [
    //     {
    //       path: "/resourceManagement/professionalManagement",
    //       meta: {
    //         show: false
    //       },
    //       component: resolve =>
    //         require([
    //           "../views/resourceManagement/professionalManagement.vue"
    //         ], resolve)
    //     },
    //     {
    //       path: "/resourceManagement_professionalManagement_look",
    //       meta: {
    //         title: "课程列表",
    //         show: false
    //       },
    //       redirect:
    //         "/resourceManagement/professionalManagement_look/:majorId/:name",
    //       component: resolve => require(["../views/moduleMain.vue"], resolve),
    //       children: [
    //         {
    //           path:
    //             "/resourceManagement/professionalManagement_look/:majorId/:name",
    //           meta: {
    //             show: false
    //           },
    //           component: resolve =>
    //             require([
    //               "../views/resourceManagement/professionalManagement_look.vue"
    //             ], resolve)
    //         },
    //         {
    //           path:
    //             "/resourceManagement/professionalManagement_look_list/:courseId/:courseName/:wareVer",
    //           meta: {
    //             title: "课件、习题列表",
    //             show: false
    //           },
    //           component: resolve =>
    //             require([
    //               "../views/resourceManagement/courseManagement_look.vue"
    //             ], resolve)
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      path: "/resourceManagement/schoolManagement",
      meta: {
        title: "院校管理",
        show: true
      },
      component: resolve =>
        require(["../views/resourceManagement/schoolManagement.vue"], resolve)
    },
    {
      path: "/resourceManagement/siteReleteStation/:siteId",
      meta: {
        title: "关联函授站",
        show: false
      },
      component: resolve =>
        require(["../views/resourceManagement/siteReleteStation.vue"], resolve)
    },
    {
      path: "/resourceManagement/courseBook",
      meta: {
        title: "课程图书",
        show: true
      },
      component: resolve =>
        require(["../views/resourceManagement/courseBook.vue"], resolve)
    },
    {
      path: "/resourceManagement/courseStation",
      meta: {
        title: "站点管理",
        show: true
      },
      component: resolve =>
        require(["../views/resourceManagement/courseStation.vue"], resolve)
    },
    {
      path: "/resourceManagement/schoolCourse",
      meta: {
        title: "学校课程",
        show: true
      },
      component: resolve =>
        require(["../views/resourceManagement/schoolCourse.vue"], resolve)
    }
  ]
};

export default router_module;
