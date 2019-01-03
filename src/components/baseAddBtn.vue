<template>
 <div class="ml10">
     <div class="addWrap">
          <img :src="btnAdd"  class="addBtn">
     </div>
 </div>
</template> 

<script>
import btnAdd from "@/assets/img/add.png";
export default {
  data() {
    return {
      btnAdd
    };
  },
  components: {
    // btnAdd
  },
  methods: {},
  mounted() {},
  created() {}
};
</script>

<style lang="less" scoped>
.addWrap {
  text-align: center;
  width: 30px;
  height: 16px;
  display: table-cell;
  cursor: pointer;
  vertical-align: middle;
  & > .addBtn {
    // display: block;
    width: 12px;
    height: 12px;
  }
}
</style>
