const router_module = {
  path: "/moduleMain",
  meta: {
    title: "学生管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  children: [
    {
      path: "/studentManagement_studentInformation",
      meta: {
        title: "考前学生",
        show: true
      },
      redirect: "/studentManagement/studentPre",
      component: resolve => require(["../views/moduleMain.vue"], resolve),
      children: [
        {
          path: "/studentManagement/studentPre",
          meta: {
            show: false
          },
          component: resolve =>
            require([
              "../views/studentManagement/studentPre.vue"
            ], resolve)
        },
          {
              path: "/studentManagement/studentDetailPre/:studentId/:studentName",
              meta: {
                  title: "学生-查看",
                  show: false
              },
              component: resolve =>
                  require([
                      "../views/studentManagement/studentDetailPre.vue"
                  ], resolve)
          }
        // {
        //   path: "/studentManagement/studentInformation_look/:id",
        //   meta: {
        //     title: "学习笔记，学习作业，测评记录",
        //     show: false
        //   },
        //   component: resolve =>
        //     require([
        //       "../views/studentManagement/studentInformation_look.vue"
        //     ], resolve)
        // }
      ]
    },
      {
          path: "/studentManagement/selfHelp",
          meta: {
              title: "自主报名",
              show: true
          },
          component: resolve =>
              require([
                  "../views/studentManagement/selfHelp.vue"
              ], resolve)
      },
    {
      path: "/studentManagement/enrollStudent",
      meta: {
        title: "录取名单",
        show: true
      },
      component: resolve =>
        require([
          "../views/studentManagement/enrollStudent.vue"
        ], resolve)
    },
      {
          path: "/studentManagement/studentInfo",
          meta: {
              title: "学生信息",
              show: true
          },
          component: resolve =>
              require([
                  "../views/studentManagement/studentInfo.vue"
              ], resolve)
      },
      {
          path: "/studentManagement/studentTrans",
          meta: {
              title: "学籍异动",
              show: true
          },
          component: resolve =>
              require([
                  "../views/studentManagement/studentTrans.vue"
              ], resolve)
      },
      {
          path: "/studentManagement/studentrp",
          meta: {
              title: "奖惩管理",
              show: true
          },
          component: resolve =>
              require([
                  "../views/studentManagement/studentrp.vue"
              ], resolve)
      },
    // {
    //   path: "/studentManagement/qualificationExamination",
    //   meta: {
    //     title: "资格审核",
    //     show: true
    //   },
    //   component: resolve =>
    //     require([
    //       "../views/studentManagement/qualificationExamination.vue"
    //     ], resolve)
    // },
    // {
    //   path: "/studentManagement/studentArchives",
    //   meta: {
    //     title: "助学档案",
    //     show: true
    //   },
    //   component: resolve =>
    //     require(["../views/studentManagement/studentArchives.vue"], resolve)
    // },
    // {
    //   path: "/studentManagement/comprehensiveEvaluation",
    //   meta: {
    //     title: "综合评价",
    //     show: true
    //   },
    //   component: resolve =>
    //     require([
    //       "../views/studentManagement/comprehensiveEvaluation.vue"
    //     ], resolve)
    // },
    // {
    //   path: "/studentManagement/ordinaryPerformance",
    //   meta: {
    //     title: "平时成绩",
    //     show: true
    //   },
    //   component: resolve =>
    //     require(["../views/studentManagement/ordinaryPerformance.vue"], resolve)
    // },
    // {
    //   path: "/studentManagement/examResults",
    //   meta: {
    //     title: "考试成绩",
    //     show: true
    //   },
    //   component: resolve =>
    //     require(["../views/studentManagement/examResults.vue"], resolve)
    // }
  ]
};

export default router_module;
