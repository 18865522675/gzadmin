const router_module = {
  path: "/moduleMain",
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  meta: {
    title: "公告邮件",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  children: [
    {
      path: "/message/messageType",
      meta: {	
        show: true,
        title: "公告类别"
      },
      component: resolve => require(["@/views/message/messageType.vue"], resolve)
    },
    {
      path: "/message/messgeList",
      meta: {
        show: true,
        title: "公告列表"
      },
      component: resolve => require(["@/views/message/messgeList.vue"], resolve)
    },
    {
      path: "/message/stationMessage",
      meta: {
        show: true,
        title: "站内信管理"
      },
      component: resolve => require(["@/views/message/stationMessages.vue"], resolve)
    }
  ]
};

export default router_module;
