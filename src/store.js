import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    extra: [],
    routesArr: [], //菜单数组
    //面包屑
    crumbs: [],
    //视频弹窗
    dialogVideo: {
      src: "",
      poster: "",
      show: false,
      videoId:'',
      time: 0,
      type: "video" //video 视频，book 图书
    },
    headerPath: [],
    userInfo: {
      id: "", // 管理员id
      roleId: "", // 主考院校id
      site: "", // 主考院校
      siteId: "", // 主考院校id
      station: "", // 助考院校
      stationId: "", // 助考院校id
      type: "" // 用户类型(0普通 1助考院校 2主考院校 3超管)
    }
  },
  mutations: {
    menu_ready(state, res) {
      return (state.routesArr = res);
    },
    headerPath_change(state, path) {
      return (state.headerPath = path);
    },
    //改变面包屑
    crumbs_change(state, matched) {
      let crumbs = [];

      matched.map(item => {
        if (item.meta.title) {
          crumbs.push({
            title: item.meta.title,
            path: item.path
          });
        }
      });
      return (state.crumbs = crumbs);
    },
    //显示视频弹窗
    dialogVideo_show(state, res) {
      if (!res.type) res.type = "video";
      return (state.dialogVideo = {
        src: res.src,
        poster: res.poster,
        time: res.time,
        videoId:res.videoId,
        show: true,
        type: res.type
      });
    },
    //关闭视频弹窗
    dialogVideo_close(state) {
      return (state.dialogVideo = {
        src: "",
        poster: "",
        time: 0,
        show: false
      });
    },
    save_userInfo(state, res) {
      console.log(res)
      return (state.userInfo = res);
    },
    save_extra(state, res) {
      return (state.extra = res);
    }
  },
  actions: {
    route_change({ commit }, res) {
      let pathArr = [];

      res.map(item => {
        if (item.path) pathArr.push(item.path);
        if (item.redirect) pathArr.push(item.redirect);
      });
      commit("crumbs_change", res);
      commit("headerPath_change", pathArr);
    },
    save_userInfo({ commit }, res) {
      let resString = JSON.stringify(res);
      commit("save_userInfo", resString);
      Cookies.set("userInfo", resString);
    },
    store_ready({ commit }, fun) {
      let userInfoStr = Cookies.get("userInfo");
      let userInfo = JSON.parse(userInfoStr);
      commit("save_userInfo", userInfo);
      fun();
    }
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo;
    }
  }
});
