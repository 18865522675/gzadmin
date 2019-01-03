import Vue from "vue";
// 基础添加组件
import baseAddBtn from "../baseAddBtn.vue";
Vue.component("baseAddBtn", baseAddBtn);

// 基础修改组件
import baseModifyBtn from "../baseModifyBtn.vue";
Vue.component("baseModifyBtn", baseModifyBtn);

// 基础删除组件/
//delOk:删除成功的回调     delUrl:删除的url   delId:所需删除的id
import baseDelBtn from "../baseDelBtn.vue";
Vue.component("baseDelBtn", baseDelBtn);

// 基础查看组件
import baseSeeBtn from "../baseSeeBtn.vue";
Vue.component("baseSeeBtn", baseSeeBtn);

// 下载模板
import download from "../download.vue";
Vue.component("download", download);

// 批量导入
import upload from "../upload.vue";
Vue.component("upload", upload);

// 按钮——批量启用
import batchEnabled from "../batchEnabled.vue";
Vue.component("batchEnabled", batchEnabled);

// 按钮——批量禁用
import batchDisable from "../batchDisable.vue";
Vue.component("batchDisable", batchDisable);

// 表格封面
import tableCover from "../tableCover.vue";
Vue.component("tableCover", tableCover);