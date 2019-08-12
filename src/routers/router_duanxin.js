const router_module = {
    path: "/moduleMain",
    component: resolve => require(["../views/moduleMain.vue"], resolve),
    meta: {
        title: "短信管理",
        show: true, // 是否显示
        listHide: true // 是否子菜单
    },
    children: [
        {
            path: "/duanxin/duanxin",
            meta: {
                show: true,
                title: "短信管理"
            },
            component: resolve => require(["@/views/duanxin/duanxin.vue"], resolve)
        }
    ]
};

export default router_module;
