/*
   时间戳转换
 */
import { stringify } from "qs";
import { MessageBox } from "element-ui";
import config from "../../config";
let timeFormat = timeStr => {
  let timeObj = new Date(timeStr);
  let year = timeObj.getFullYear(); //年
  let month = timeObj.getMonth() + 1; //月
  let day = timeObj.getDate(); //日
  let hours = timeObj.getHours(); //时
  let minutes = timeObj.getMinutes(); //分
  let seconds = timeObj.getSeconds(); //秒

  if (year < 10) year = "0" + year;
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
};

let obj = {
  table: {
    time(val1, val2, val3) {
      if (val3) {
        return timeFormat(val3);
      }
    }
  },
  time(val) {
    if (val) {
      return timeFormat(val);
    } else {
      return "";
    }
  },
  //删除空的参数
  signDel(res) {
    for (let key in res) {
      let item = res[key];
      if (item === null || item === undefined || item === "") {
        delete res[key];
      }
    }
    return res;
  },
  match: {
    manyFloat(res) {
      if (res) {
        res = String(res);
        //先把非数字的都替换掉，除了数字和.
        res = res.replace(/[^\d.]/g, "");
        //保证只有出现一个.而没有多个.
        res = res.replace(/\.{2,}/g, ".");
        //必须保证第一个为数字而不是.
        res = res.replace(/^\./g, "");
        //保证.只出现一次，而不能出现两次以上
        res = res
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
        //只能输入两个小数
        res = res.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3");

        return res;
      }
    }
  },
  admissManage: {
    stringify(obj) {
      return stringify(obj);
    }
  },
  urlEnJson(res) {
    return encodeURIComponent(JSON.stringify(res));
  },
  urlDeJson(res) {
    return JSON.parse(decodeURIComponent(res));
  },
  showImg(url) {
    let imgUrl = url.startsWith("http") ? url : config.HOST_API + url;
    let Img = `<img src="${imgUrl}" style='width:100%'/>`;

    MessageBox.alert(Img, "查看", {
      confirmButtonText: "关闭",
      closeOnPressEscape: true,
      dangerouslyUseHTMLString: true
    });
  },
  form: {
    phone(rule, value, callback) {
      value = String(value);
      let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (value.match(reg)) {
        callback();
      } else if (rule.required || value) {
        callback(new Error("请输入有效的手机号码"));
      } else {
        callback();
      }
    },
    score(rule, value, callback) {
      value = String(value);
      let reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
      if (value.match(reg)) {
        callback();
      } else if (rule.required || value) {
        callback(new Error("请输入数值"));
      } else {
        callback();
      }
    }
  }
};

export default obj;
