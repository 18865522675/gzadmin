const router_module = {
  path: "/moduleMain",
  meta: {
    title: "基本信息",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  children: [
    {
      path: "/essentialInformation_professionalManagement",
      meta: {
        title: "专业管理",
        show: true
      },
      redirect: "/essentialInformation/professionalManagement",
      component: resolve => require(["../views/moduleMain.vue"], resolve),
      children: [
        {
          path: "/essentialInformation/professionalManagement",
          meta: {
            show: false
          },
          component: resolve =>
            require([
              "../views/essentialInformation/professionalManagement.vue"
            ], resolve)
        },
        {
          path: "/essentialInformation_professionalManagement_look",
          meta: {
            title: "课程列表",
            show: false
          },
          redirect:
            "/essentialInformation/professionalManagement_look/:majorId/:name",
          component: resolve => require(["../views/moduleMain.vue"], resolve),
          children: [
            {
              path:
                "/essentialInformation/professionalManagement_look/:majorId/:name",
              meta: {
                show: false
              },
              component: resolve =>
                require([
                  "../views/essentialInformation/professionalManagement_look.vue"
                ], resolve)
            },
            {
              path:
                "/essentialInformation/professionalManagement_look_list/:courseId/:courseName/:wareVer",
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
        }
      ]
    },
    {
      path: "/essentialInformation_courseManagement",
      meta: {
        title: "科类管理",
        show: true
      },
      redirect: "/essentialInformation/subjectManagement",
      component: resolve => require(["../views/moduleMain.vue"], resolve),
      children: [
        {
          path: "/essentialInformation/subjectManagement",
          meta: {
            show: false
          },
          component: resolve =>
            require([
              "../views/essentialInformation/subjectManagement.vue"
            ], resolve)
        },
        {
          path:
            "/essentialInformation/courseManagement_look/:courseId/:courseName/:wareVer",
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
    {
      path: "/essentialInformation/baseInfoStation",
      meta: {
        title: "站点管理",
        show: true
      },
      component: resolve =>
        require([
          "../views/essentialInformation/baseInfoStation.vue"
        ], resolve)
    },
    {
      path: "/essentialInformation/baseInfoYear",
      meta: {
        title: "年级管理",
        show: true
      },
      component: resolve =>
        require([
          "../views/essentialInformation/baseInfoYear.vue"
        ], resolve)
    }
  ]
};

export default router_module;
