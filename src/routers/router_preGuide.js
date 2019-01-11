const router_module = {
    path: "/moduleMain",
    component: resolve => require(["../views/moduleMain.vue"], resolve),
    meta: {
        title: "考前辅导",
        show: true, // 是否显示
        listHide: true // 是否子菜单
    },
    children: [
        {
            path: "/preGuide/preGuideDiscipline",
            meta: {
                show: true,
                title: "辅导科类"
            },
            component: resolve => require(["@/views/preGuide/preGuideDiscipline.vue"], resolve)
        },
        {
            path: "/preGuide/preGuideCourse",
            meta: {
                show: true,
                title: "辅导课程"
            },
            component: resolve => require(["@/views/preGuide/preGuideCourse.vue"], resolve)
        },
        {
            path: "/preGuide/preGuideWare",
            meta: {
                show: true,
                title: "辅导课件"
            },
            component: resolve => require(["@/views/preGuide/preGuideWare.vue"], resolve)
        },
        {
            path: "/preGuide/preGuideDoc",
            meta: {
                show: true,
                title: "辅导文档"
            },
            component: resolve => require(["@/views/preGuide/preGuideDoc.vue"], resolve)
        }
    ]
};

export default router_module;
