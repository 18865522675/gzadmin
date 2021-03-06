const router_module = {
  path: "/moduleMain",
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  meta: {
    title: "考务管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  children: [
    {
      path: "/exam/examArrange",
      meta: {	
        show: true,
        title: "考试安排"
      },
      component: resolve => require(["@/views/exam/examArrange.vue"], resolve)
    },
    {
      path: "/exam/arrangeStudent/:id",
      meta: {	
        show: false,
        title: "考试安排-学生"
      },
      component: resolve => require(["@/views/exam/arrangeStudent.vue"], resolve)
    },
    {
      path: "/exam/examStudent",
      meta: {	
        show: true,
        title: "考试学生"
      },
      component: resolve => require(["@/views/exam/examStudent.vue"], resolve)
    },
     {
      path: "/exam/dailyScore",
      meta: {	
        show: true,
        title: "平时成绩"
      },
      component: resolve => require(["@/views/exam/dailyScore.vue"], resolve)
    },
    {
      path: "/exam/examScore",
      meta: {	
        show: true,
        title: "考试成绩"
      },
      component: resolve => require(["@/views/exam/examScore.vue"], resolve)
    },
    {
      path: "/exam/studentScore",
      meta: {	
        show: true,
        title: "学生成绩"
      },
      component: resolve => require(["@/views/exam/studentScore.vue"], resolve)
    },
    {
      path: "/exam/onlineScore",
      meta: {	
        show: true,
        title: "在线成绩"
      },
      component: resolve => require(["@/views/exam/onlineScore.vue"], resolve)
    },
    {
      path: "/exam/onlineExam",
      meta: {	
        show: true,
        title: "在线考试"
      },
      component: resolve => require(["@/views/exam/onlineExam.vue"], resolve)
    },
    {
      path: "/exam/courseExamRelete/:workId/:workName/:type/:planId",
      meta: {	
        show: false,
        title: "在线考试-查看"
      },
      component: resolve => require(["@/views/exam/courseExamRelete.vue"], resolve)
    }
  ]
};

export default router_module;
