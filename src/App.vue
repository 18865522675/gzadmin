<template>
  <div id="app" class="g-app">
    <router-view/>
    <!--视频弹窗-->
    <dialogVideo/>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/reset.less";
import "./assets/css/style.less";
import "./assets/css/media.less";
import dialogVideo from "./components/dialogVideo";

export default {
  name: "app",
  components: {
    dialogVideo
  },
  mounted() {
    require("./public/main");
  }
};
</script>
