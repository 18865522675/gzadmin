import Vue from "vue";
import Router from "vue-router";
import login from "./views/login";
import main from "./views/main";
import notAuthority from "./views/notAuthority";
import notFound from "./views/notFound";
import demo from "./views/demo";
import router_home from "./routers/router_home"; //首页
import router_essentialInformation from "./routers/router_essentialInformation"; //基本信息
import router_accountManagement from "./routers/router_accountManagement"; //账号管理
import router_preGuide from "./routers/router_preGuide"; //学生管理
import router_studentManagement from "./routers/router_studentManagement"; //学生管理
import router_resourceManagement from "./routers/router_resourceManagement"; //资源管理
//import router_guideManage from "./routers/router_guideManage"; //辅导管理
import router_studyManage from "./routers/router_studyManage"; //学习管理
import router_systemManagement from "./routers/router_systemManagement"; //系统管理
import router_message from "./routers/router_message"; //公告邮件
import router_payment from "./routers/router_payment"; //缴费管理
import router_orderPay from "./routers/router_orderPay"; //订单缴费
import router_teachManage from "./routers/router_teachManage"; //订单缴费
import router_exam from "./routers/router_exam"; //订单缴费

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      meta: {
        title: "登录"
      },
      component: login
    },
    {
      path: "/notAuthority",
      meta: {
        title: "无访问权限"
      },
      component: notAuthority
    },
    {
      path: "/notFound",
      meta: {
        title: "404"
      },
      component: notFound
    },
    {
      path: "/",
      component: main,
      redirect: "/login",
      children: [
//      {
//        path: "/demo",
//        meta: {
//          title: "demo",
//          show: false
//        },
//        component: demo
//      },
        router_home, //首页
//      router_accountManagement, //账号管理
        router_essentialInformation, //基本信息
        router_resourceManagement, //资源管理
//      router_guideManage, //辅导管理
          router_preGuide,
        router_studentManagement, //学生管理
//      router_studyManage, //学习管理
//         router_orderPay, //订单缴费
//      router_payment, //缴费管理
        router_message, //公告邮件
        router_teachManage,
        router_systemManagement, //系统管理
        router_exam
      ]
    }
  ]
});
