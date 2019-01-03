<template>
 <div>
   <a :href="downloadUrl"  ref="downloadBtn" class="kf-btn kf-btn-table marL10" style="font-size:14px;margin-top: -4px;color:#FFBB51;" download="">{{text?text:"下载模板"}}</a>
 </div>
</template>

<script>
export default {
  data() {
    return {
      downloadUrl: ""
    };
  },
  props: ["url", "text", "localDown"],
  mounted() {
    this.initDownload();
  },
  watch: {
    url: function() {
      // console.log(2);
      this.initDownload();
    }
  },
  updated() {
    // console.log(this.url);
  },
  methods: {
    initDownload() {
      if (!this.localDown) {
        this.downloadUrl = this.$api.global.url + this.url;
      } else {
        this.downloadUrl = this.url;
      }
    }
  }
};
</script>

<style lang="less">
</style>
