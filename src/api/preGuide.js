import { $ } from "./axios";
export default {
    //      获取辅导科类列表
    getGuidePreDisciplineList: params => $.get("/tutor/discipline/list", params),

    //      辅导科类-添加
    preGuideDiscipline_add: params =>
        $.post("/tutor/discipline", params),

    //      辅导科类-编辑
    preGuideDiscipline_edit: (id, params) =>
        $.put("/tutor/discipline/" + id, params, { lock: true }),


    //获取辅导课程科类
    getGuidePreCourse_disciplines: params => $.get("/tutor/course/listDisciplines", params),

    //      获取辅导课程列表
    getGuidePreCourses: params => $.get("/tutor/course/list", params),

    //      辅导课程-添加
    preGuideCourse_add: params =>
        $.post("/tutor/course", params),

    //      辅导课程-编辑
    preGuideCourse_edit: (id, params) =>
        $.put("/tutor/course/" + id, params, { lock: true }),



    //获取辅导课件课程
    getGuidePreWare_courses: params => $.get("/tutor/ware/listTutorCourse", params),

    //获取辅导课件科类
    getGuidePreWare_discipliness: params => $.get("/tutor/ware/listDisciplines", params),

    //      获取辅导课件列表
    getGuidePreWare: params => $.get("/tutor/ware/list", params),

    //      辅导课程-添加
    preGuideWare_add: params =>
        $.post("/tutor/ware", params),

    //      辅导课程-编辑
    preGuideWare_edit: (id, params) =>
        $.put("/tutor/ware/" + id, params, { lock: true }),




    //获取辅导文档课程
    getGuidePreDoc_courses: params => $.get("/tutor/doc/listTutorCourse", params),

    //获取辅导文档科类
    getGuidePreDoc_discipliness: params => $.get("/tutor/doc/listDisciplines", params),

    //      获取辅导文档列表
    getGuidePreDoc: params => $.get("/tutor/doc/list", params),

    //      辅导文档-添加
    preGuideDoc_add: params =>
        $.post("/tutor/doc", params),

    //      辅导文档-编辑
    preGuideDoc_edit: (id, params) =>
        $.put("/tutor/doc/" + id, params, { lock: true }),

};
