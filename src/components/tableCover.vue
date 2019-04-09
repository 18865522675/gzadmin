<template>
  <div>
    <div
      class="tableImg-img fun-hover-img"
      :style="{backgroundImage: 'url(\''+url+'\')'}"
      :data-src="url"
      v-if="!text"
    ></div>
    {{text}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  watch: {
    url: function() {
      this.ready();
    }
  },
  props: ["url"],
  mounted() {
    this.ready();
  },
  methods: {
    ready() {
      if (this.url) {
        this.text = "加载中...";
        this.imgLoad();
      } else {
        this.text = "/";
      }
    },
    imgLoad() {
      let _this = this;
      let Img = new Image();

      Img.onload = function() {
        _this.text = "";
      };
      Img.onerror = function() {
        _this.text = "无效链接";
      };
      Img.src = this.url;
    }
  }
};
</script>
<style lang="less">
	.tableImg-img {
  width: 100%;
  min-width: 100px;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
