const router_module = {
  path: "/moduleMain",
  component: resolve => require(["../views/moduleMain.vue"], resolve),
  meta: {
    title: "学校管理",
    show: true, // 是否显示
    listHide: true // 是否子菜单
  },
  children: [
    {
      path: "/schoolManage/stationSet",
      meta: {	
        show: true,
        title: "函授站设置"
      },
      component: resolve => require(["@/views/schoolManage/stationSet.vue"], resolve)
    },
    {
      path: "/schoolManage/schoolInfo",
      meta: {	
        show: true,
        title: "学校信息"
      },
      component: resolve => require(["@/views/schoolManage/schoolInfo.vue"], resolve)
    }
  ]
};

export default router_module;
