const HOST_IND = 3 , // 切换服务器
  HOST = [
    "", // 正式服务器
    "http://61.153.184.193:8082/", // 测试服务器
    "http://192.168.1.12:8082/", // 其它测试
    "http://47.107.105.141:81/", // 贵州正式服
    "http://47.107.105.141:88/", // 贵州正式服
    "http://hlh.gzsqwhcm.com:81/"
  ],
  HOST_CATALOG_API = "manager-api/", // api目录
  HOST_CATALOG_IMG = "manager-api/"; // 图片资源目录

if (HOST_IND !== 0) {
  console.log(
    "%c当前HOST在测试环境：" + HOST[HOST_IND],
    "background: #000;color:#ffff00;padding: 2px"
  );
}

export default {
  HOST: HOST[HOST_IND],
  HOST_API: HOST[HOST_IND] + HOST_CATALOG_API,
  HOST_IMG: HOST[HOST_IND] + HOST_CATALOG_IMG
};
