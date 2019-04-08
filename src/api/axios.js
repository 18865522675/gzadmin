import axios from "axios";
import { stringify } from "qs";
import { Message, Loading } from "element-ui";
import router from "../router";
import config from "../../config";
import Cookies from "js-cookie";

//const HOST = config.HOST;
//const PREFIX_URL = config.HOST_API;

//console.log("http://"+window.location.host+":81/manager-api/")

let HOST="";
let PREFIX_URL=""

if(window.location.href.indexOf("localhost")<0){
	//	正式
//	  HOST="http://"+window.location.host.split(":")[0]+":81"
//	 PREFIX_URL="http://"+window.location.host.split(":")[0]+":81/manager-api/";	

//		测试
	   HOST="http://47.107.105.141:88/";
	   PREFIX_URL="http://47.107.105.141:88/manager-api/"
}else{

//	正式
//	 HOST="http://hlh.gzsqwhcm.com:81"
//	 PREFIX_URL="http://hlh.gzsqwhcm.com:81/manager-api/"

//		测试
	   HOST="http://47.107.105.141:88/";
	   PREFIX_URL="http://47.107.105.141:88/manager-api/";
}

/**
 *
 * @param method 请求方式
 *          get, post, delete, put
 * @param url 请求链接
 * @param params 请求参数
 * @param conf 请求配置
 *          dataType: "formData"/"json",  默认 "formData"
 *          dataPart: ""/"url"  默认: ""
 */
const ajax_main = (method, url = "", params, conf = {}) => {
  return new Promise((resolve, reject) => {
    const notBodyMethod = ["GET", "DELETE"];
    let loading;
    let configObj = {
      method,
      url: PREFIX_URL + url,
      headers: {
//      token:1111
      },
      withCredentials: true //跨域携带凭证
    };
    console.log(configObj)

    //禁用缓存, 不然ie里会有问题
    configObj.headers["If-Modified-Since"] = "0";
    configObj.headers["Cache-Control"] = "no-cache";

    //序列化url参数
    if (notBodyMethod.indexOf(method) > -1 || conf.dataPart === "url") {
     	if(method=="GET"){
     		configObj.url = configObj.url + "?" + stringify(params);
     	}
    } else {
      configObj.data = params;
    }

    //序列化body参数
    if (conf.dataType !== "json")
      configObj.transformRequest = res => stringify(res);

    if (conf.lock) {
      loading = Loading.service({
        background: "rgba(255, 255, 255, 0.4)"
      });
    }

    axios(configObj)
      .then(res => {
        if (res.status === 200) {
          if (res.data.code == 0) {
            //成功
            resolve(res.data);
          } else if (res.data.code === 100000004) {
            //未登录
            Message.error(res.data.msg);
            Cookies.remove("userInfo");
            router.push("/login?from=" + encodeURIComponent(location.pathname));
          } else if (res.data.code === 100000002) {
            //无权限
//          router.replace("/notAuthority");
               Message.error(res.data.msg);
            reject(res.data);
          } else if (res.data.code === 100050005) {
            reject(res.data);
          } else {
            Message.error(res.data.msg);
            reject(res.data);
          }
        } else {
          Message.error(res.statusText + " " + res.status);
          reject(res);
        }
        if (loading) loading.close();
      })
      .catch(err => {
        if (err.response) {
          Message.error(err.response.statusText + " " + err.response.status);
        } else {
          Message.error(err.message);
        }
        reject(err);
        if (loading) loading.close();
      });
  });
};

const $ = {
  get: (url, params, conf) => ajax_main("GET", url, params, conf),
  delete: (url, params, conf) => ajax_main("DELETE", url, params, conf),
  post: (url, params, conf) => ajax_main("POST", url, params, conf),
  put: (url, params, conf) => ajax_main("PUT", url, params, conf)
};

export { $, PREFIX_URL, HOST };
