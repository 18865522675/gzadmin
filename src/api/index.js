import { PREFIX_URL, HOST } from "./axios";

import main from "./main";
import home from "./home";
import essentialInformation from "./essentialInformation";
import accountManagement from "./accountManagement";
import studentManagement from "./studentManagement";
import resourceManagement from "./resourceManagement";
import guideManage from "./guideManage";
import studyManage from "./studyManage";
import systemManagement from "./systemManagement";
import message from "./message";
import payment from "./payment";
import orderPay from "./orderPay";
import teachManage from "./teachManage";
import preGuide from "./preGuide";
//模块目录
const api = {
  global: {
    url: PREFIX_URL,
    host: HOST,
    img: HOST
  },
  main,
  home,
  essentialInformation, //基本信息
  accountManagement, //账号管理
  studentManagement, //学生管理
  resourceManagement, //资源管理
  guideManage, //辅导
  studyManage, //学习
  systemManagement, //系统管理
  message, //消息管理
  payment, //缴费管理
  orderPay, //缴费管理
  teachManage,
    preGuide
};

export default api;
