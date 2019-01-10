import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import config from "../config";
import api from "./api";
import fun from "./public/fun";
import Cookies from "js-cookie";
import "./components/globalComponets/globalComponets.js"; // 全局组件的管理

let codeType = 1; // 0 权限关闭，1 打开权限

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$config = config;
Vue.prototype.$fun = fun;

Vue.use(ElementUI);

// 设置权限菜单
let permissionMenu = () => {
  return new Promise((resolve, reject) => {
    // if (store.state.extra.length) {
    //   resolve(store.state.extra);
    // } else {
    api.main
      .get_homeList()
      .then(res => {
        store.commit("save_extra", res.data.extra);
        console.log(res.data.extra)
        resolve(res.data.extra);
      })
      .catch(res => {
        reject(res);
      });
    // }
  });
};

let permissionReady = () => {
  return new Promise((resolve, reject) => {
    let routerMain = [];
    router.options.routes.map(item => {
      if (item.path === "/") {
        routerMain = item.children;
      }
    });
    permissionMenu()
      .then(res => {
        try {
          routerMain.map(item => {
            let routerStatus = codeType ? false : true; //**权限管理
            res.map(itemRes => {
              if (
                item.meta.title === itemRes.module.replace(/ /g, "") ||
                item.meta.title === "首页"
              ) {
                routerStatus = true;
              }
            });

            // 二级
            if (item.children)
              item.children.map(item_children => {
                let routerItemStatus = codeType ? false : true; //**权限管理
                res.map(itemRes => {
                  if (itemRes.submodules)
                    itemRes.submodules.map(itemRes_childs => {
                      if (
                        item_children.meta.title ===
                        itemRes_childs.name.replace(/ /g, "")
                      ) {
                        routerItemStatus = true;
                      }
                    });
                });
                item_children.meta = {
                  ...item_children.meta,
                  routerStatus: routerItemStatus
                };
              });

            item.meta = {
              ...item.meta,
              routerStatus: routerStatus
            };
          });
          store.commit("menu_ready", routerMain);

          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .catch(res => {
        reject(res);
      });
  });
};

let notAuthority = ["/login", "/notAuthority", "/notFound"];
router.beforeEach((to, from, next) => {
  //是否有这个页面
if (!to.matched.length) {
    router.replace("/notFound");
    return;
}

let path = to.matched[to.matched.length - 1].path;

// 不验证权限的页面
if (notAuthority.indexOf(path) === -1) {
    store.dispatch("route_change", to.matched);
    // 获取权限
    if(Cookies.set("userInfo")){
         	store.dispatch("save_userInfo", JSON.parse(Cookies.set("userInfo")));
    }
//  	store.dispatch("save_userInfo", JSON.parse(Cookies.set("userInfo")));
 permissionReady()
   .then(() => {
     // 读取本地信息
     store.dispatch("store_ready", () => {
     	console.log(123)
     	
       next();
     });
   })
   .catch((e) => {
     console.log(e)
     ElementUI.Message("获取权限失败");
     Cookies.remove("userInfo");
     router.replace("/login");
   });
} else {
    next();
}

		next()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
