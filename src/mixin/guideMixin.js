// import {Message} from "element-ui"
export default {
  methods: {
    actionMes(mes) {
      this.$message({
          type:"success",
          message:mes,
          duration:1200
      });
      this.selectChange(false);
      this.dialogVisible = false;
    },
    selectChange(isSel) {
      if (isSel) {
        this.resetPage();
      }
      this.getDataList();
    },
    resetPage() {
      this.pageNum = 1;
      this.pageSize = 10;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.selectChange(false);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.selectChange(false);
    }
  },
  watch: {
    keyword: function(n) {
      if (!n) this.selectChange(true);
    }
  }
};
