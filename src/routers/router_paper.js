const router_module = {
  path: "/moduleMain",
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  meta: {
    title: "论文管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  children: [
    {
      path: "/paper/paperApply",
      meta: {
        show: true,
        title: "设计申请"
      },
      component: resolve => require(["@/views/paper/paperApply.vue"], resolve)
    },
    {
      path: "/paper/paperTopic",
      meta: {
        show: true,
        title: "论文选题"
      },
      component: resolve => require(["@/views/paper/paperTopic.vue"], resolve)
    },
    {
      path: "/paper/paperAudit",
      meta: {
        show: true,
        title: "选题审核"
      },
      component: resolve => require(["@/views/paper/paperAudit.vue"], resolve)
    },
    {
      path: "/paper/openAudit",
      meta: {
        show: true,
        title: "开题审核"
      },
      component: resolve => require(["@/views/paper/openAudit.vue"], resolve)
    },
    {
      path: "/paper/lunwen",
      meta: {
        show: true,
        title: "论文审核"
      },
      component: resolve => require(["@/views/paper/lunwen.vue"], resolve)
    },
    {
      path: "/paper/defenceApply",
      meta: {
        show: true,
        title: "申请答辩"
      },
      component: resolve => require(["@/views/paper/defenceApply.vue"], resolve)
    },
    {
      path: "/paper/defenceArrange",
      meta: {
        show: true,
        title: "答辩安排"
      },
      component: resolve => require(["@/views/paper/defenceArrange.vue"], resolve)
    },
    {
      path: "/paper/defenceScore",
      meta: {
        show: true,
        title: "答辩成绩"
      },
      component: resolve => require(["@/views/paper/defenceScore.vue"], resolve)
    },
    {
      path: "/paper/applyPosition",
      meta: {
        show: true,
        title: "申请学位"
      },
      component: resolve => require(["@/views/paper/applyPosition.vue"], resolve)
    },
    {
      path: "/paper/teacherSee/:id",
      meta: {
        show: false,
        title: "查看导师"
      },
      component: resolve => require(["@/views/paper/teacherSee.vue"], resolve)
    },
    {
      path: "/paper/defenceArrangeSee/:id",
      meta: {
        show: false,
        title: "答辩安排-查看"
      },
      component: resolve => require(["@/views/paper/defenceArrangeSee.vue"], resolve)
    },
    
    
  ]
};

export default router_module;
