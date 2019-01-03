module.exports = {
  baseUrl: "/",
  devServer: {
    proxy: {
      "manager-api/": {
        target: "http://61.153.184.193:8082/"
      }
    }
  }
};
