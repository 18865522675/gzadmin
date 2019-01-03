<template>
    <el-button type="text"  size="small" class="baseModifyBtn" :disabled="disabled">查看</el-button>
</template>

<script>
export default {
  name: "baseSeeBtn",
  methods: {},
  props: ["disabled"],
  mounted() {},
  created() {},
  updated() {},
  watch: {}
};
</script>

<style scoped>
.baseModifyBtn {
  color: #5e4faa;
  //   color: Red;
}
</style>
