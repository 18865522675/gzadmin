import { $ } from "./axios";

export default {
//函授站设置
  getStationList: params => $.get("/siteManager/station/list", params),
  
  stationEdit: (id,params) => $.put("/siteManager/station/"+id, params),
  
  
  
  editSchoolInfo: (params) => $.put("/siteManager/station", params),
  getSchoolInfo: () => $.get("/siteManager/station",{}),

};
