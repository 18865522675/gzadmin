<template>
  <!--视频预览-->
  <el-dialog
    :visible.sync="dialogVideo.show"
    width="1200px"
    :show-close="false"
    @close="dialogVideo_close"
    class="kf-dialog-video">
    <div class="kf-dialog-video-head" v-if="dialogVideo.type==='video'">
      <div class="kf-dialog-video-head-cap mr60">课件预览</div>
      <div class="kf-dialog-video-head-tit" v-if="dialogVideo.time">总时长[{{dialogVideo.time}}秒]</div>
    </div>
    <div class="kf-dialog-video-head" v-if="dialogVideo.type==='book'">
      <div class="kf-dialog-video-head-cap mr60">图书预览</div>
    </div>
    <!--视频-->
    <div class="kf-dialog-video-box" v-if="dialogVideo.type==='video'">
      <video :src="dialogVideo.src" :poster="dialogVideo.poster" controls="controls" class="kf-dialog-video-main"></video>
    </div>
    <!--图书-->
    <div class="kf-dialog-book-box" v-if="dialogVideo.type==='book'">
      <template v-if="bookMake">
        <img :src="dialogVideo.poster" alt="" class="kf-dialog-book-make">
        <div class="kf-dialog-book-play" :style="{backgroundImage: 'url('+require('../assets/img/ico_13.png')+')'}" @click="bookPlay"></div>
      </template>
      <iframe :src="dialogVideo.src" frameborder="0" class="kf-dialog-book"></iframe>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button type="primary" @click="dialogVideo_close">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      bookMake: true
    };
  },
  watch: {
    "dialogVideo.show": function() {
      this.bookMake = true;
    }
  },
  computed: mapState(["dialogVideo"]),
  methods: {
    //关闭视频弹窗
    dialogVideo_close() {
      this.$store.commit("dialogVideo_close");
    },
    bookPlay() {
      this.bookMake = false;
    }
  }
};
</script>
